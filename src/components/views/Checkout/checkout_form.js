
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
    import GetLable from '../../functions/process_lable'
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

    //[] state variables
        //[] is [separate delivery destination] form open
        const [isOpen, setIsOpen] = useState(false);    
        //[] which is the chosen option for [Select] / [select payment]
        const [selectedOption, setSelectedOption] = useState(null);
    //    
    //[] some variables
        let deliveryCheckboxLable = []; 

        let paymentLable = [];  
        let paymentOptions = [];

        let orderClient = [];
        let orderDelivery = [];
        let orderPayment = [];
    //
    //[] sorting out the lables        
        pass_prop_data && pass_prop_data.map( elem => {
            switch (elem.FormGroup){
                //[] make array of data fields for client
                case 'client': {
                    orderClient.push( elem );
                    break;                 
                }

                //[] make array of data fields for delivery
                case 'delivery': {
                    orderDelivery.push( elem );
                    break;                 
                }

                // [] set label for [delivery checkbox]
                case '0' : {
                    deliveryCheckboxLable = elem;                                
                    break;
                }

                //[] set label for [payment select]
                case 'payment' : {
                    if( elem.Type === 'select' ) {
                        paymentLable = elem;
                    } else {
                        orderPayment.push( elem );
                    }
                    break;
                }
                //[]
                default : {
                    console.log('unused label : ', elem);                                
                    break;
                }
            }
        })
    //
    //[] sorting client & delivery fields
        orderClient.sort( function(a, b){
            return a.Order_id - b.Order_id
        });        
        orderDelivery.sort( function(a, b){
            return a.Order_id - b.Order_id
        });        
        orderPayment.sort( function(a, b){
            return a.Order_id - b.Order_id
        });
    //
    //[] defining [payment select] options, as needed for [Select] package
        orderPayment.map( elem => {      
            if( elem.Name === 'choose_payment' ) {
                paymentOptions.push({ 
                    label: elem[prop_lang], 
                    value: 'choose_payment', 
                    disabled: 'yes'
                })
            } else {     
                paymentOptions.push({ 
                    label: elem[prop_lang], 
                    value: elem.Name 
                })
            }
        });         
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
            menuPortalTarget={document.querySelector('body')} // so it would display over everything else / without scrollbar
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
                    orderClient && orderClient.map( elem => {
                        return( 
                            <CheckoutInput
                                key={ elem.id } 
                                data={ elem } 
                                formik_values={ formik_values }
                                formik_handleChange={ formik_handleChange }
                                formik_errors={ formik_errors }
                                prop_lang = { prop_lang }
                            /> 
                        ) 
                    })                    
                }
                </Col>
            </Row>

            <Row id="checkoutShowDelivery" className="my_checkout_formRow">
                <Col>
                    <lable htmlFor="del_check" className="my_checkout_lable">{ deliveryCheckboxLable[prop_lang] }</lable>
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
                            orderDelivery && orderDelivery.map( elem => {
                                return( 
                                    <CheckoutInput
                                        key={ elem.id } 
                                        data={ elem } 
                                        formik_values={ formik_values }
                                        formik_handleChange={ formik_handleChange }
                                        formik_errors={ formik_errors }
                                        prop_lang = { prop_lang }
                                    /> 
                                ) 
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
                                <lable htmlFor="payment_method" className="my_checkout_lable">{ paymentLable[prop_lang] }</lable> 
                            ) : (
                                <lable htmlFor="payment_method" className="my_checkout_error my_checkout_lable">
                                    { paymentLable[prop_lang] } 
                                    <i className="my_checkout_errSign" title={formik_errors[paymentLable.Name]}>*</i>
                                </lable>
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