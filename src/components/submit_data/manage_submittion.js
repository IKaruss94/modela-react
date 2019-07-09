
/** [] Imported @ 
 * src/views-bootstrap/Checkout/checkout.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import PropTypes from 'prop-types'
// [] structure and style components
// [] my components
    import { PostFormToServer } from '../../redux_store/actions/postForm'
    import MakeClientHTML from './prep_clientHTML'
    import MakeOwnerHTML from './prep_ownerHTML'
    import PrepQuery from './prep_submitQuery'
// [] my images

// -------------------------------------------------------------------------------

const PrepDataToSubmit = ( form_data, cart_data, payment_long_names ) => {
    // [] needed values
        let client_data = [];
        let delivery_data = [];
        let payment_data = []; 
        let subtotal_EU = 0;
        let subtotal_EXPORT = 0;  

        let clientEmail, c_country, c_city, c_address, d_country, d_city, d_address;


    // [] separate form data in 2 arrays and payment data
        Object.keys(form_data).map( (key) => {
            switch ( key.substring(0, 3) ) {
                case 'del':
                    if( form_data[key] !== '' )
                        delivery_data.push( { name: key, value: form_data[key] } );
                    break;
                case 'pay':
                    payment_long_names.map( payType => {
                        if( payType.value === form_data[key] )
                            payment_data.push({ name:'payment_method', value: payType.long_name });
                    })                    
                    break;
                default :
                    client_data.push( { name: key, value: form_data[key] } );
                    break;
            }

            // [] prep shorthand address ([Country], [City], [Address]) for client e-mail
                switch ( key ) {
                    case ('email'): clientEmail = form_data[key]; break;

                    case ('country'): c_country = form_data[key]; break;
                    case ('city'):  c_city = form_data[key]; break;
                    case ('address'): c_address = form_data[key]; break;

                    case ('del_country'): d_country = form_data[key]; break;
                    case ('del_city'): d_city = form_data[key]; break;
                    case ('del_address'): d_address = form_data[key]; break;

                    default: break;
                }
            //
        });

    // [] forming shorthand address ([Country], [City], [Address]) for client e-mail   
        let client_destinaton = 
            c_country +' ,'+ c_city +' ,'+ c_address;
        let delivery_destinaton = 
            d_country === '' ? ('') : ( d_country +' ,'+ d_city +' ,'+ d_address );
    //

    // [] caluclating price subtotals
        cart_data.map(cartItem => {
            subtotal_EU = subtotal_EU + (cartItem.quantity * cartItem.priec_eu);
            subtotal_EXPORT = subtotal_EXPORT + (cartItem.quantity * cartItem.preice_export);
        });        
        payment_data.push({ name:'subtotal_EU', value: subtotal_EU.toFixed(2) });
        payment_data.push({ name:'subtotal_EXPORT', value: subtotal_EXPORT.toFixed(2) });
    //
                
    // getting HTML for email
        const clientHTML = MakeClientHTML( 
            cart_data, 
            client_destinaton,
            delivery_destinaton,
            payment_data
        );
        const ownerHTML = MakeOwnerHTML( 
            cart_data, 
            client_data, 
            delivery_data, 
            payment_data
        );
        const submitQuery = PrepQuery( 
            form_data,
            cart_data,
        );
    //
    
        //console.log('client ', clientHTML ); 
        //console.log('owner:', ownerHTML ); 
        console.log('query:', submitQuery ); 
        console.log('payments:', payment_data ); 

    let res = '';
    try{
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // [] Call to send e-mails and save to DB
        //PostFormToServer( clientHTML, clientEmail, ownerHTML ); 
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        res = 'Success';
    }
    catch(err) {
        console.log('form submit error', err);
        res = 'Fail';
    }

    return(res);    
}
PrepDataToSubmit.propTypes = {  
    form_data: PropTypes.any,
    cart_data: PropTypes.func
}
export default (PrepDataToSubmit);
