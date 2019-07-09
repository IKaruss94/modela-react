
/** [] Imported @ 
 * src/views-bootstrap/Checkout/checkout.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React, { useState } from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { CSSTransitionGroup } from 'react-transition-group'
    import { Row, Col, Button } from 'react-bootstrap'    
    import { Form, Field } from 'formik'    
    import Select from 'react-select'
// [] my components
    import CheckoutInput from './checkout_formGroup'
    import GetLable from '../processLable'
// [] my images

// -------------------------------------------------------------------------------

const CheckoutForm = ( { 
    pass_prop_data, 
    formik_values, 
    formik_errors,
    formik_handleSubmit, 
    formik_handleChange,
    formik_setFieldValue,
    prop_lang,
    prop_lables,
} ) => {
    
//#######################################################################################################

    const [isOpen, setIsOpen] = useState(false);    
    const [selectedOption, setSelectedOption] = useState(null);

    // [] some variables
        let deliveryLable = [];     
        let paymentLable = [];  
    //
        // [] prepare [payment Select] options
        let paymentOptions = [];
        
        pass_prop_data && pass_prop_data.map( elem => {
            if( elem.FormGroup === 'payment' && elem.Type === 'option' ) {      
                if( elem.Name === 'choose_payment' ) {
                    paymentOptions.push({ 
                        label: elem[prop_lang.toUpperCase()], 
                        value: 'choose_payment', 
                        disabled: 'yes' 
                    })
                } else {     
                    paymentOptions.push({ 
                        label: elem[prop_lang.toUpperCase()], 
                        value: elem.Name 
                    })
                }  
            }
        })
    //

//#######################################################################################################

    const checkboxChange = () => {
        const curentState = !isOpen;
        formik_setFieldValue('del_check', curentState);
        setIsOpen(curentState);
    }

    const selectChange = ( chosenValue ) => {        
        setSelectedOption( chosenValue );        
        formik_setFieldValue('payment_method', chosenValue.value);
    }

    const SelectComponent = () => (
        <Select
            menuPortalTarget={document.querySelector('body')}
            className = "basic-single"
            classNamePrefix = "react-select"
            name = 'payment_method'
            isOptionDisabled={(paymentOptions) => paymentOptions.disabled === 'yes'}
            value= { selectedOption === null ? (paymentOptions[0]):(selectedOption) }
            options = { paymentOptions }
            onChange = { selectChange }
        />  
    );

//#######################################################################################################

    return(
        <Form id="my_form_chekout" >     
            <Row id="checkoutClient" className="my_checkout_formRow">
                <Col> 
                {                    
                    pass_prop_data && pass_prop_data.map( elem => {
                        switch (elem.FormGroup){
                            // [] display client data inputs
                            case 'client': {
                                if( elem.Name !== 'firstName' && elem.Name !== 'lastName' )
                                    return(<CheckoutInput
                                        key={ elem.ID_data } 
                                        data={ elem } 
                                        formik_values={ formik_values }
                                        formik_handleChange={ formik_handleChange }
                                        formik_errors={ formik_errors }
                                        prop_lang = { prop_lang }
                                    />)                           
                                break;
                            }
                            // [] set label for [del_check]
                            case '0' : {
                                deliveryLable = elem;                                
                                break;
                            }
                            // set label for [payment_select]
                            case 'payment' : {
                                if( elem.Type === 'select' ) 
                                    paymentLable = elem; 
                                break;
                            }
                            default : {
                                //console.log('unused label : ', elem);                                
                                break;
                            }
                        }
                    })
                }
                </Col>
            </Row>

            <Row id="checkoutShowDelivery" className="my_checkout_formRow">
                <Col>
                    <span className="my_checkout_lable">{ deliveryLable[prop_lang.toUpperCase()] }</span>
                    <Field 
                        type='checkbox'
                        name='del_check'
                        className="my_checkout_checkbox" 
                        id='checkout_delCheck' //{`inline-checkbox-1`} 
                        onChange={ () => checkboxChange() } 
                    />
                </Col>
            </Row>
            
            {isOpen && (     
                <CSSTransitionGroup
                    transitionName="my_transi_service" //"example""my_transi_service"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                >                 
                    <Row id="checkoutDelivery" className="my_checkout_formRow">
                        <Col>
                        {                 
                            pass_prop_data && pass_prop_data.map( elem => {
                                if( elem.FormGroup === 'delivery' )
                                    return (<CheckoutInput 
                                        key={ elem.ID_data } 
                                        data={ elem }
                                        formik_values={ formik_values }
                                        formik_handleChange={ formik_handleChange }
                                        formik_errors={ formik_errors }
                                        prop_lang = { prop_lang }
                                    />)
                            })
                        }
                        </Col>
                    </Row>
                </CSSTransitionGroup>
            )}
{
    // [] next row = [select]
}
            <Row id="checkoutPayment" className="my_checkout_formRow">
                <Col>
                    <div>                      
                        {    
                            // [] change label if requierments are not met, as defined in checking.js -> checkoutSchema       
                            !formik_errors[paymentLable.Name] ? (
                                <span className="my_checkout_lable">{ paymentLable[prop_lang.toUpperCase()] }</span> 
                            ) : (
                                <span className="my_checkout_error my_checkout_lable">
                                    { paymentLable[prop_lang.toUpperCase()] } 
                                    <i className="my_checkout_errSign" title={formik_errors[paymentLable.Name]}>*</i>
                                </span>
                            )
                        }

                        <Field 
                            name = 'payment_method'
                            className = "my_checkout_select"    
                            component = { SelectComponent }
                        />
                    </div>

                </Col>
            </Row>          
{
    // [] next row = submit button
}
            <Row>
            <Col className="my_checkout_formBtn">
                
                {          
                    Object.values(formik_errors).length === 0 ? (
                        <Button 
                            variant="primary" 
                            size="lg" 
                            block 
                            onClick={ () => { formik_handleSubmit(formik_values); } }
                        >{ GetLable( prop_lang, prop_lables, 'button', 'submit') }</Button>
                    ) : (
                        <Button 
                            variant="danger" 
                            size="lg" 
                            block 
                            disabled
                        >{ GetLable( prop_lang, prop_lables, 'button', 'checkout_nope') }</Button>
                    )
                }
            </Col>
            </Row>
{
    // [] end of form
}
        </Form>
    );    
}

CheckoutForm.propTypes = {  
    pass_prop_data: PropTypes.any, 
    prop_lang: PropTypes.any,
    prop_lables: PropTypes.any,

    formik_values: PropTypes.any, 
    formik_errors: PropTypes.any,
    formik_handleChange: PropTypes.func, 
    formik_handleSubmit: PropTypes.func, 
    formik_setFieldValue: PropTypes.func,     
}
export default (CheckoutForm);