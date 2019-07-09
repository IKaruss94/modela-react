
/** [] Imported @ 
 * src/views-bootstrap/Checkout/checkout.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import Form from 'react-bootstrap/Form'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const CheckoutFormGroups = ( { 
    data, 
    formik_values, 
    formik_handleChange,
    formik_errors,
    prop_lang,
} ) => {
    return(                 
        <Form.Group controlId = { data.FormGroup === 'client' ? ( 'CheckoutClient.'+data.Name ) : ( 'CheckoutDeliver.'+data.Name ) } >
            <Form.Label className="my_checkout_lable">
            {
                // [] change lable if requierments are not met, as defined in checking.js -> checkoutSchema    
                !formik_errors[data.Name] ? (
                    <span className="">{ data[prop_lang.toUpperCase()] }</span> 
                ) : (
                    <span className="my_checkout_error">{ data[prop_lang.toUpperCase()] } <i className="my_checkout_errSign" title={formik_errors[data.Name]}>*</i></span>
                )
            }
            </Form.Label>
            <Form.Control 
                type={ data.Type } 
                name={ data.Name } 
                placeholder={ data.Placeholder } 
                
                value={ formik_values[data.Name] }
                onChange={ formik_handleChange }
            />
        </Form.Group>
    );    
}

CheckoutFormGroups.propTypes = {  
    data: PropTypes.any,
    prop_lang: PropTypes.any,

    formik_values: PropTypes.any, 
    formik_errors: PropTypes.any,
    formik_handleChange: PropTypes.func, 
}
export default (CheckoutFormGroups);