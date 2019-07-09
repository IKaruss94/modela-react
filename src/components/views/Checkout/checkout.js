
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
// [] structure and style components
  //import ReactHtmlParser from 'react-html-parser'
  import { Helmet } from 'react-helmet'
  import { Container, Button } from 'react-bootstrap'
  import { Formik } from 'formik'
  import * as yup from 'yup'
  import Swal from 'sweetalert2'
// [] my components
  import { fetchData } from '../../../redux_store/actions/getData'
  import CartTable from './checkout_cart'
  import Checkoutform from './checkout_form'
  //import PrepDataToSubmit from '../../submit_data/manage_submittion'  
  import { PostFormToServer } from '../../../redux_store/actions/postForm'
// [] my images

// -------------------------------------------------------------------------------

class Checkout extends Component {  

  componentDidMount(){    
    this.props.GetData('checkout');    
  }

  render(){ 
    //console.log('checkout props', this.props);  
    // [] setting props
      const { 
        history, 
        prop_cart, 
        prop_data, 
        ClearCart,
        prop_lang, 
        prop_lables 
      } = this.props;
    
    // [] form requierment schema
      let checkoutSchema = yup.object().shape({
        /*
        firstName: yup
          .string()
          .required('Required'),
        lastName: yup
          .string()
          .required('Required'),
        */
       
        fullName: yup
          .string()
          .required('Required'),
        email: yup
          .string()
          .email('Invalid email')
          .required('Required'),
        address: yup
          .string()
          .required('Required'),
        city: yup
          .string()
          .required('Required'),
        zip: yup
          .string()
          .required('Required'),
        country: yup
          .string()
          .required('Required'),
        phone: yup
          .number('Phone NUMBER')
          .required('Required'),
          
        del_name: yup
          .string(),
        del_address: yup
          .string(),
        del_city: yup
          .string(),
        del_zip: yup
          .string(),
        del_state: yup
          .string(),
        del_country: yup
          .string(),
        del_phone: yup
          .number('Phone NUMBER'),

        payment_method: yup
          .string()
          .required('Required'),
      });
    // [] form initial value, defines form as controlled
      let checkoutInitVal = {
        //fullName: '',
        //lastName: '',
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        phone: '',
        del_check: false,
        del_name: '',
        del_address: '',
        del_city: '',
        del_zip: '',
        del_state: '',
        del_country: '',
        del_phone: '',
        payment_method: '',
      }
      
    // [] choosing what to render
      return (
        <Container> 
          <Helmet><title>Checkout</title></Helmet>



          <CartTable cart_data={prop_cart} /> 

          <Button 
            variant="primary" 
            size="lg" 
            block 
            onClick={ () => { console.log('I want to go back to cart') } }
          >back to cart [static_text]</Button>



          <Formik
            initialValues = { checkoutInitVal }
            validationSchema = { checkoutSchema }
            validateOnChange
            onSubmit = { ( formData ) => {
            // [] SUBMITTING ---------------------------------------------------
            
              //console.log( 'CHECKOUT test', formData, prop_cart ); 
              // [] function to actualy submit

              Swal.fire({
                type: 'info',
                title: 'Submitting your order', 
                showConfirmButton: false, 
                allowOutsideClick: false,
              });
              Swal.showLoading();

              
              PostFormToServer( formData, prop_cart ).then( (res) => {
                
                if( res === 'OK' ) {
                  Swal.fire({
                    type: 'success',
                    title: 'Order submitted!',
                    confirmButtonText: 'OK',
                    timer: 5000,
                  })
                  .then(      
                    ClearCart(),                
                    history.push( '/' )
                  );
                } else {
                  Swal.fire({
                    type: 'error',
                    title: 'An error has occured.', 
                    text: res,
                    confirmButtonText: 'OK', 
                  });
                }    
                              
              });
              
            
            // [] !SUBMITTING -----------------------------------------------------------------
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
              <Checkoutform 
                pass_prop_data        = { prop_data }
                prop_lang             = { prop_lang }
                prop_lables           = { prop_lables }
                formik_handleSubmit   = { handleSubmit } 
                formik_handleChange   = { handleChange }
                formik_setFieldValue  = { setFieldValue }
                formik_values         = { values }
                formik_errors         = { errors }
              />
            )}
          </Formik>
            
        </Container>
      )       
    //
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_lables: state.rootStatic.lable_data,

  prop_cart: state.rootCart.redu_cartItems,  
  prop_data: state.rootData.data.checkout,
})
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_id) => { dispatch( fetchData(page_id) ) },
    ClearCart: () => { dispatch({ type:'RESET_CART' }) }
  }
}
Checkout.propTypes = { 
  history: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_lables: PropTypes.any,

  prop_cart: PropTypes.any,
  prop_data: PropTypes.any,

  GetData: PropTypes.func,
  ClearCart: PropTypes.func,

}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

/**
 * 
            {({
              handleSubmit,
              handleChange,
              values,
              //touched,
              errors,
            }) => (
              <Checkoutform 
                pass_prop_data        = { prop_data }
                formik_handleSubmit   = { handleSubmit } 
                formik_values         = { values }
                formik_handleChange   = { handleChange }
                formik_errors         = { errors }
                prop_lang             = { prop_lang }
                prop_lables           = { prop_lables }
              />
            )}
          </Formik>

          


 let checkoutInitVal = {
  fullName: 'dave davidson',
  email: 'ivars.knets@gmail.com',
  address: 'dave street 123',
  city: 'citysvill',
  zip: '123',
  state: 'daveState',
  country: 'US of Smash',
  phone: '12345678',
  del_check: false,
  del_name: '',
  del_address: '',
  del_city: '',
  del_zip: '',
  del_state: '',
  del_country: '',
  del_phone: '',
  payment_method: '',
}

/*/