// imports
    import axios from 'axios';

// POST form data TO server   client, delivery, payment
    export const PostFormToServerPreProcessed = ( clientHTML, clientEmail, ownerHTML ) => {  // order, client, delivery, payment
        return (
            axios({
                url: 'http://localhost:4000/form',
                method: 'post',
                data: {
                    client_html: clientHTML, 
                    client_email: clientEmail,
                    owner_html: ownerHTML
                }
                /*
                data: {
                    order: order,
                    form_client: client,
                    form_delivery: delivery,
                    payment: payment,
                } 
                */
            })
            .then(function (response) {
                console.log('POST form - SUCCESS: ', response);
                /*
                return {
                    texts: res_Text.data.data // chenge here aswell
                }; 
                */
            })
            .catch(function (error) {
                console.log('POST form - ERROR: ', error);
            })
        )
    }
//

// POST form data TO server   client, delivery, payment
export const PostFormToServer = ( formData, cartData ) => {  // order, client, delivery, payment
    return (
        axios({
            url: 'http://localhost:4000/form',
            method: 'post',
            data: {
                FORM: formData, 
                CART: cartData
            }
            /*
            data: {
                order: order,
                form_client: client,
                form_delivery: delivery,
                payment: payment,
            } 
            */
        })
        .then(function (response) {
            console.log('POST form - SUCCESS: ', response);            
            return 'OK';
        })
        .catch(function (error) {
            console.log('POST form - ERROR: ', error);
            return error;
        })
    )
}
//