
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
  import { Container, Row, Col, Button } from 'react-bootstrap'
  import { LinkContainer } from 'react-router-bootstrap'
  import { Formik } from 'formik'
  import * as yup from 'yup'
  import Swal from 'sweetalert2'
// [] my components
  //import PageLoading from '../../Errors/pageLoading'
  import GetLabel from '../../functions/process_label'
  import CheckoutText from '../../../json/checkout.json'
  //import SUBMIT_DATA from '../../order_submission/manage_submission'
  import CartTable from '../../multipage_components/cart_table'
  import CheckoutForm from './checkout_form'

// -------------------------------------------------------------------------------

class Checkout extends Component {  

  render(){ 
    //console.log('checkout props', this.props);  
    // [] setting props
      const { 
        history, 
        prop_lang, 
        prop_cart, 
        //ClearCart !!! unComment wehn setting up submitting
      } = this.props;
    
      //[] making an array of payment names for use in emails     
      let paymentNames = [];   
      CheckoutText && CheckoutText.map( elem => {
        if( elem.FormGroup === 'payment' && elem.Type === 'option' ) {
          paymentNames.push({ Name:elem.Name, LongName:elem.ENG });                
        }
      })
    //
    
    // [] form requierment schema
      const checkoutSchema = yup.object().shape({   
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
          
        del_fullName: yup
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
      const checkoutInitVal = {
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        phone: '',
        del_check: false,
        del_fullName: '',
        del_address: '',
        del_city: '',
        del_zip: '',
        del_state: '',
        del_country: '',
        del_phone: '',
        payment_method: ''
      }

      
    // [] return statement   
      if( prop_cart.length == 0 ){
        return(
          <Container>                 
            <LinkContainer to="/store">
              <Button variant="primary" size="lg" block>
                { GetLabel( prop_lang, 'button', 'to_checkout_no') }
              </Button>
            </LinkContainer>  
          </Container>
        )
      }
      else
      {
        return (
          <Container> 
            <Helmet><title>Checkout</title></Helmet>
            
            <Row >
                <Col className="my_checkout_cart">
                  <CartTable tableType = 'checkout' />
                </Col>
            </Row>  

            <Button 
              variant="primary" 
              size="lg" 
              block 
              onClick={ () => { history.push( '/cart' ) } }
            >
              { GetLabel( prop_lang, 'button', 'btn_backToCart') }
            </Button>


            <Formik
              initialValues = { checkoutInitVal }
              validationSchema = { checkoutSchema }
              validateOnChange
              onSubmit = { ( formData ) => {
              // [] SUBMITTING ---------------------------------------------------
              
                //console.log( 'CHECKOUT test', formData, prop_cart ); 
                // [] function to actualy submit

                Swal.fire({
                  type: 'success',
                  title: 'Order [would be] submitted.',
                  confirmButtonText: 'OK',
                  timer: 5000,
                })
                console.log('submitted - form data: ', formData);
                console.log('submitted - cart data: ', prop_cart);

                /*
                Swal.fire({
                  type: 'info',
                  title: 'Submitting your order', 
                  showConfirmButton: false, 
                  allowOutsideClick: false,
                });
                Swal.showLoading();
                
                SUBMIT_DATA( formData, prop_cart, paymentNames ).then( (res) => {
                //PostFormToServer( formData, prop_cart ).then( (res) => {
                  
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
                */
              
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
                <CheckoutForm 
                  prop_lang             = { prop_lang }
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
      } //[] end of else    
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_cart: state.rootCart.redu_cartItems,  
})
const mapDispatchToProps = (dispatch) => {
  return{
    ClearCart: () => { dispatch({ type:'RESET_CART' }) }
  }
}
Checkout.propTypes = { 
  history: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_cart: PropTypes.any,

  ClearCart: PropTypes.func,
}
export default connect( mapStateToProps, mapDispatchToProps )(Checkout)