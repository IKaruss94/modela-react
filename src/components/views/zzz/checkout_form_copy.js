
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
import { Row, Col, Form , Button } from 'react-bootstrap'
// [] my components
import CheckoutInput from '../Checkout/checkout_formGroup'
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
const [isOpen, setIsOpen] = useState(false);

// [] some variables
    let deliveryLable = [];     
    let paymentLable = [];   
//

const checkboxChange = (e) => {
    const curentState = !isOpen;
    //formik_handleChange; // [] doesent work due to [Formik] package bug, to be fixed in v2 (alegedly)
    console.log( 'isOpen ? ', curentState );
    formik_setFieldValue('del_check', curentState);
    setIsOpen(curentState);

    // google -> formik custom component
}

return(             
    <Form 
        id="my_form_chekout"
    >     
        <Row id="checkoutClient" className="my_checkout_formRow">
            <Col> 
            {                    
                pass_prop_data && pass_prop_data.map( elem => {
                    if( elem.FormGroup === 'client' ) 
                        return(<CheckoutInput 
                            key={ elem.ID_data } 
                            data={ elem } 
                            formik_values={ formik_values }
                            formik_handleChange={ formik_handleChange }
                            formik_errors={ formik_errors }
                            prop_lang = { prop_lang }
                        />)
                        if( elem.FormGroup === '0' ) deliveryLable = elem;
                        if( elem.FormGroup === 'payment' && elem.Type === 'select' ) paymentLable = elem;
                })
            }
            </Col>
        </Row>

        <Row id="checkoutShowDelivery" className="my_checkout_formRow">
            <Col>
                <Form.Group>
                    <Form.Label className="my_checkout_lable">{ deliveryLable[prop_lang.toUpperCase()] }</Form.Label>
                    <Form.Check 
                        className="my_checkout_checkbox" 
                        inline 
                        name='del_check'
                        id={`inline-checkbox-1`} 
                        onChange={ (e) => checkboxChange(e) } 
                    />
                </Form.Group>
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
                <Form.Group controlId="CheckoutPayment.Method">
                    <Form.Label className="my_checkout_lable">                        
                    {    
                        // [] change lable if requierments are not met, as defined in checking.js -> checkoutSchema       
                        !formik_errors[paymentLable.Name] ? (
                            <span className="">{ paymentLable[prop_lang.toUpperCase()] }</span> 
                        ) : (
                            <span className="my_checkout_error">
                                { paymentLable[prop_lang.toUpperCase()] } 
                                <i className="my_checkout_errSign" title={formik_errors[paymentLable.Name]}>*</i>
                            </span>
                        )
                    }
                    </Form.Label>

                    <Form.Control 
                        as="select" 
                        name='payment_method'
                        className="my_checkout_select"                            
                        value={ formik_values[paymentLable.Name] }
                        onChange={ formik_handleChange }
                    >
                    {   
                    // paymentLable.Name = "payment_method"                 
                    // [] go through the data recieved from DB(table = [data_checkout]), get entrys where [if]
                        pass_prop_data && pass_prop_data.map( elem => {
                            if( elem.FormGroup === 'payment' && elem.Type === 'option' ) {      
                                if( elem.Name === 'choose_payment' ) {
                                    return (
                                        <option 
                                            disabled
                                            key={ elem.ID_data } 
                                            value=""
                                        >
                                            { elem[prop_lang.toUpperCase()] }
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option 
                                            key={ elem.ID_data } 
                                            value={ elem.Name }
                                        >
                                            { elem[prop_lang.toUpperCase()] }
                                        </option>
                                    );
                                }                 
                                
                            }
                        })
                    }
                    </Form.Control>

                </Form.Group>
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
}
export default (CheckoutForm);

/**{
                        pass_prop_data && pass_prop_data.map( elem => {
                            if( elem.FormGroup === 'payment' && elem.Type === 'option' ) {      
                                if( elem.Name === 'choose_payment' ) {
                                    paymentPlaceholder = elem[prop_lang.toUpperCase()];    
                                } else {
                                    selectOptions.push({ 
                                        value: elem.Name, 
                                        label: elem[prop_lang.toUpperCase()]
                                    });
                                }                 
                                
                            }
                        })
                    }
                    <Select
                        className = "my_checkout_select basic-single"
                        classNamePrefix = "select"
                        name = "payment_method"     
                        options = { selectOptions }  
                        value = { selected }
                        placeholder = { paymentPlaceholder }
                        onChange = { (selected) => {
                            setSelected( selected );
                            console.log('checkout select: ', selected);
                            setFieldValue("payment_method", selected);
                        } }
                    />
* 
* 
* 
* 

                    <Form.Control 
                        as="select" 
                        name='payment_method'
                        className="my_checkout_select"                            
                        value={ formik_values[paymentLable.Name] }
                        onChange={ formik_handleChange }
                    >
                    {   
                    // paymentLable.Name = "payment_method"                 
                    // [] go through the data recieved from DB(table = [data_checkout]), get entrys where [if]
                        pass_prop_data && pass_prop_data.map( elem => {
                            if( elem.FormGroup === 'payment' && elem.Type === 'option' ) {      
                                if( elem.Name === 'choose_payment' ) {
                                    return (
                                        <option 
                                            disabled
                                            key={ elem.ID_data } 
                                            value=""
                                        >
                                            { elem[prop_lang.toUpperCase()] }
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option 
                                            key={ elem.ID_data } 
                                            value={ elem.Name }
                                        >
                                            { elem[prop_lang.toUpperCase()] }
                                        </option>
                                    );
                                }                 
                                
                            }
                        })
                    }
                    </Form.Control>
*/