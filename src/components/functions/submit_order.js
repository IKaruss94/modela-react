




import axios from 'axios'
import Swal from 'sweetalert2'
import JSON_checkout from '../../json/checkout.json'

const SubmitOrder = ( props ) => {
  const { pass_history, pass_formData, pass_cart, pass_ClearCart } = props;
  
  //const LIVEcloudFunc = 'https://us-central1-modela-1501516157418.cloudfunctions.net/OrderSubmit';
  const EMULATORcoludFunc = 'http://localhost:5001/modela-1501516157418/us-central1/OrderSubmit';
  
  try{    

    Swal.fire({
      type: 'info',
      title: 'Submitting your order', 
      showConfirmButton: false, 
      allowOutsideClick: false,
    });
    Swal.showLoading();

  //---LOADDING ---------------------------------------    
              
    //[] Calculating subtotals
      let subtotals = {vat: 0.00, noVat: 0.00 };
      pass_cart && pass_cart.map( elem => {
          subtotals.vat = subtotals.vat + elem.priec_eu * elem.quantity;
          subtotals.noVat = subtotals.noVat + elem.preice_export * elem.quantity;
      });

    //[] Getting a proper name for selected payment method                
      const payment_longName = JSON_checkout.find( elem => {
        if( elem.Name === pass_formData.payment_method ) return elem
      });

    //[] Adding extra values to formData
      Object.assign( pass_formData, {
        payment_method_long: payment_longName.ENG,
        subtotal_vat: subtotals.vat,
        subtotal_noVat: subtotals.noVat,                    
      });

    //[] putting all the data into one object to POST
      const orderData = { 
        submit_data: pass_formData, 
        submit_cart: pass_cart
      };
      console.log('test', orderData );
      
  // --- LOADING IS DONE (officialiy in the [.then] method )

    //[] after submiting a function to firebase you get an URL, that goes here
      axios({
        method: 'POST',
        url: EMULATORcoludFunc,
        data: orderData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
      .then( (res) => {
        console.log(res);
        
        if(res.status === 200){        
          pass_ClearCart();
          pass_history.push( '/' );
          
          Swal.fire({
            type: 'success',
            title: 'Order [would be] submitted.',
            confirmButtonText: 'OK',
          });
        } else {        
          Swal.fire({
            type: 'error',
            title: 'OOOOOOOOOOOOOPS',
            confirmButtonText: 'OK',
          });
        }
        
      })


  }catch( err ) {
    console.log(err);          
    pass_history.push( '/' );

    Swal.fire({
      type: 'error',
      title: 'There was a problem.',
      confirmButtonText: 'OK',
    });
  }


} 
export default SubmitOrder