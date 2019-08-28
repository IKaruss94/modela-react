
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
    import CheckoutText from '../../../json/checkout.json'
    import GetLabel from '../../functions/process_label'
// [] my images

// -------------------------------------------------------------------------------



const InputField = (props) => {
    const { language, fieldLabels, field, form } = props;
    //console.log('input props', field.name , props);

    return(
        <div className="myCheckout_clientField">            
            <label htmlFor={field.name} className="myCheckout_clientLabel">{ fieldLabels[language] }</label> 
            <input 
                {...field} 
                className = "myCheckout_clientInput"  
                type = { fieldLabels.Type }    
            />
        </div>
    )
}
InputField.propTypes = {  
    fieldLabels: PropTypes.object,
    language: PropTypes.string,
    field: PropTypes.any,
    form: PropTypes.any,
}

const CheckoutForm = ( { 
    formik_values, 
    formik_errors,
    formik_handleSubmit, 
    formik_handleChange,
    formik_setFieldValue,
    prop_lang,
} ) => {
//#######################################################################################################

    //[] state variables
        //[] is [separate delivery destination] form open
        const [isOpen, setIsOpen] = useState(false);    
        //[] which is the chosen option for [Select] / [select payment]
        const [selectedOption, setSelectedOption] = useState(null);
    //    
    //[] some variables
        let deliveryCheckboxLabel = []; 

        let paymentLabel = [];  
        let paymentOptions = [];

        let orderClient = [];
        let orderDelivery = [];
        let orderPayment = [];
    //
    //[] sorting out the labels        
        CheckoutText && CheckoutText.map( elem => {
            switch (elem.FormGroup){
                //[] make array of data fields for client
                case 'client': {                     
                    if( elem.Order_id >= 0 ) orderClient.push( elem );
                    break;                 
                }

                //[] make array of data fields for delivery
                case 'delivery': {
                    orderDelivery.push( elem );
                    break;                 
                }

                // [] set label for [delivery checkbox]
                case '0' : {
                    deliveryCheckboxLabel = elem;                                
                    break;
                }

                //[] set label for [payment select]
                case 'payment' : {
                    if( elem.Type === 'select' ) {
                        paymentLabel = elem;
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
                            <Field 
                                key={ elem.Name } 
                                name={ elem.Name } 
                                fieldLabels = { elem }
                                language = { prop_lang }
                                component={ InputField } 
                            />
                        ) 
                    })                    
                }
                </Col>
            </Row>

            <Row id="checkoutShowDelivery" className="my_checkout_formRow">
                <Col>
                    <label htmlFor="del_check" className="my_checkout_label">{ deliveryCheckboxLabel[prop_lang] }</label>
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
                                    <Field 
                                        key={ elem.Name } 
                                        name={ elem.Name } 
                                        fieldLabels = { elem }
                                        language = { prop_lang }
                                        component={ InputField } 
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
                            !formik_errors[paymentLabel.Name] ? (
                                <label htmlFor="payment_method" className="my_checkout_label">{ paymentLabel[prop_lang] }</label> 
                            ) : (
                                <label htmlFor="payment_method" className="my_checkout_error my_checkout_label">
                                    { paymentLabel[prop_lang] } 
                                    <i className="my_checkout_errSign" title={formik_errors[paymentLabel.Name]}>*</i>
                                </label>
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
                        >{ GetLabel( prop_lang, 'button', 'submit') }</Button>
                    ) : (
                        <Button 
                            variant="danger" 
                            size="lg" 
                            block 
                            disabled
                        >{ GetLabel( prop_lang, 'button', 'checkout_nope') }</Button>
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
    prop_lang: PropTypes.any,

    formik_values: PropTypes.any, 
    formik_errors: PropTypes.any,
    formik_handleChange: PropTypes.func, 
    formik_handleSubmit: PropTypes.func, 
    formik_setFieldValue: PropTypes.func,     
}
export default (CheckoutForm);