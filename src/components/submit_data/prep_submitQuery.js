
/**
 * npm i nodemailer-smtp-transport
 * npm i nodemailer
 */
/** [] Imported @ 
 * manage_submittion.js
 * 
 * manualy updated 05/06/2019
*/ 

// [] fundemental componentsconst 
    import PropTypes from 'prop-types'
// [] structure and style components
    import 'moment-timezone'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const PrepSubmitQuery = ( form_data, cart_data ) => {

    let ordered_items = '';
    cart_data && cart_data.map( cartItem => {
        if( cartItem.number.slice(-2) === '99' ) {
            ordered_items = 
                ordered_items + cartItem.number +
                '['+ cartItem.reg_num +']'+
                '='+ cartItem.quantity +';';
        } else {
            ordered_items = 
                ordered_items + cartItem.number +
                '='+ cartItem.quantity +';';
        }
    });    

    const query = (
        'INSERT INTO `orders`( `Ordered_items`, `Pay_method`, `Cust_name`, `Cust_lastname`, `Cust_email`, `Cust_address`, `Cust_city`, `Cust_zip`, `Cust_state`, `Cust_country`, `Cust_phone`, `Dest_name`, `Dest_address`, `Dest_city`, `Dest_zip`, `Dest_state`, `Dest_country`, `Dest_phone` )'
        + 'VALUES ("'
        + ordered_items
        +'", "'+ form_data.payment_method 

        +'", "'+ form_data.firstName
        +'", "'+ form_data.lastName 
        +'", "'+ form_data.email
        +'", "'+ form_data.address 
        +'", "'+ form_data.city 
        +'", "'+ form_data.zip 
        +'", "'+ form_data.state 
        +'", "'+ form_data.country 
        +'", "'+ form_data.phone 

        +'", "'+ form_data.del_name 
        +'", "'+ form_data.del_address 
        +'", "'+ form_data.del_city 
        +'", "'+ form_data.del_zip 
        +'", "'+ form_data.del_state 
        +'", "'+ form_data.del_country 
        +'", "'+ form_data.del_phone 
        +'")'
    )
    return (query);
}

PrepSubmitQuery.propTypes = {  
    form_client: PropTypes.any,
    form_delivery: PropTypes.any,
    payment: PropTypes.any,
}
export default (PrepSubmitQuery);
  