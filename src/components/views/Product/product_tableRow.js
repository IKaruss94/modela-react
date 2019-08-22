
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { useState, Fragment } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
  import { LinkContainer } from 'react-router-bootstrap'
  import Img from 'react-image'
  import Currency from 'react-currency-formatter'
  import Select from 'react-select'
// [] my components
// [] my images
  import { prodTableEra, prodTableUser } from '../../functions/import_images'

// -------------------------------------------------------------------------------
// TableRow is separete because this is the only way I could figure out the problem of
//    storing an unspecified amount of input fields to this views State
// I "put" the surounding table structure in the main page.

// -------------------------------------------------------------------------------

const TDimage = ({ imageGroup, img, name }) => {
  return(         
    <td className="align-middle">
      <Img className="my_prod_tableImg img-rounded img-responsive"
        src={[
          imageGroup[img]
        ]}
        unloader={
            <div className="my_noImage_prodEmblems">{name}</div>
        }
      />
    </td>
  );
}
const TDprice = ({ price }) => {
  let num_price = parseFloat(price, 10);
   
  return(         
    <td className="my_prod_tablePrice align-middle">
      <Currency
        quantity={num_price}
        currency="EUR"
      />
    </td>
  );
}
const TDquantitiy = ({ quantity, handleQuantityChange }) => {
  return(
    <td className="align-middle">
      <Form>
        <Form.Control 
          className="my_quntityInput"    
          type="number" 
          min="1" 
          max="100" 
          placeholder="0"
          value={ quantity }
          onChange={ handleQuantityChange }
        />
      </Form>
    </td>
  )
}

// -------------------------------------------------------------------------------
const ProductTableRow = ({
  prod, 
  cartItems, 
  regNum_options, 
  actionAddToCart, 
  actionRemoveFromCart, 
  text_addToCart,
  text_kitRegInfo,
} ) => {

  const [quantity, setQuantity] = useState( 1 );
  const [selectedOption, setSelectedOption] = useState(null);
  const [chosenRegNums, setChosenRegNums] = useState(null);


  //console.log(cartItems)

  /** [] kit reg-num selector */
    // [] handle change
      const handleRegNumChange = ( chosenValue ) => {        
        setSelectedOption( chosenValue );

        let newValue;
        if( chosenRegNums !== null ) newValue = chosenRegNums + ', ' + chosenValue[chosenValue.length-1].value;
        else newValue = chosenValue[0].value;
        setChosenRegNums( newValue );
      }
  /** */
  
  /** [] in-cart checks */
    // [] check [if item already in cart], used in a function later @ [.my_prod_tableCart]
      let checkInCart = (cartElem) => { 
        return cartElem.id === prod.id
      }     
  /** */


  if( prod.Available ) {
    const inCartValue =  cartItems.find(checkInCart);

    return(
      <tr key={prod.NUM_variant}>{
          prod.NUM_variant === '99' ? (   
            // [] MODEL KIT row
            <td 
              className="my_prod_tableRegSelectTD align-middle" 
              colSpan={3}
            >    
              <Select
                menuPortalTarget={document.querySelector('body')}
                className = "basic-single my_prod_regSelect"
                classNamePrefix = "react-select"
                name = "kit-reg-num"
                isMulti
                value= { selectedOption }
                options = { regNum_options } // regNum list is ssupplyed from [product.js]
                onChange = { handleRegNumChange }
              />   

              <OverlayTrigger
                placement="right-start"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="prodKitInfoTooltip">{ text_kitRegInfo }</Tooltip>
                }
              >
                <i className="my_prod_tableRegInfo material-icons">info</i>
              </OverlayTrigger>
            </td>         
          ) : (
            // [] normal row
            <Fragment>              
              <TDimage 
                imageGroup={ prodTableEra } 
                img={ 'era_'+prod.Era+'.gif' } 
                name={ prod.Era } 
              />
              <TDimage 
                imageGroup={ prodTableUser } 
                img={ prod.IMG_emblem } 
                name={ prod.User } 
              />
              <td className="align-middle"><b>{ prod.Regist_num }</b></td>
            </Fragment>

          )          
        }
        
        <td className="align-middle">{prod.NUM_id}-{prod.NUM_variant}</td>
        <td className="align-middle">{prod.Name}</td>
        <TDprice price={ prod.Price_vat_eu } />
        <TDprice price={ prod.Price_export_eu } />

        {
          inCartValue ? (
              <Fragment>

                <TDquantitiy 
                  quantity={ inCartValue.quantity } 
                  handleQuantityChange={ e => setQuantity(e.target.value) }
                />             
            
                <td className="my_prod_tableCart align-middle">
                  <div className="my_prod_cartIn">
                    <LinkContainer to="/cart">
                      <Button className="my_prod_tableBtn" variant="success" title="Proceed to cart"><i className="material-icons">shopping_cart</i></Button>
                    </LinkContainer> 
                    <Button 
                      className="my_prod_tableBtn" 
                      variant="danger" 
                      title="Remove from cart"
                      onClick={ () => { actionRemoveFromCart(prod.id) } }
                    >
                      <i className="material-icons">close</i>
                    </Button>
                  </div>
                </td>
            </Fragment>
          ) : (
            <Fragment>
              
              <TDquantitiy 
                quantity={ quantity } 
                handleQuantityChange={ e => setQuantity(e.target.value) }
              />

              <td className="my_prod_tableCart align-middle">
                <div className="my_prod_cartAdd">
                  <Button 
                    key={ prod.NUM_variant } 
                    variant="primary" 
                    onClick={ 
                      () => actionAddToCart({ 
                        id: prod.id, 
                        name: prod.Name, 
                        number: prod.NUM_id+'-'+prod.NUM_variant, 
                        reg_num: prod.NUM_variant==='99' ? (chosenRegNums):(prod.Regist_num),
                        quantity: quantity,
                        priec_eu: prod.Price_vat_eu,
                        preice_export: prod.Price_export_eu
                      }) 
                    } 
                    // [addToCart] is in [product.js] because you don't call a disatch from a function component  
                  >{ text_addToCart }</Button>
                </div>
              </td>
            </Fragment>
          )
        }
      </tr>
    );
  }

  else {
    return (
      <tr key={prod.NUM_variant}>        
        { TDimage( prodTableEra, 'era_'+prod.Era+'.gif', prod.Era) }
        { TDimage( prodTableUser, prod.IMG_emblem, prod.User) }

        <td className="align-middle">{ prod.Regist_num }</td>
        <td className="align-middle">{ prod.NUM_id }-{ prod.NUM_variant }</td>
        <td className="align-middle">{ prod.Name }</td>

        { TDprice(prod.Price_vat_eu) }
        { TDprice(prod.Price_export_eu) }

        <td colSpan="2" className="my_prod_notAvailable">Not available</td>
      </tr>
    );
  }
}


ProductTableRow.propTypes = {  
  num: PropTypes.any,
  reg_num: PropTypes.any,
  regNum_options: PropTypes.any,
  selectedOption: PropTypes.any,
  text_addToCart: PropTypes.any,  

  RegNum: PropTypes.func,
}
TDimage.propTypes = {
  imageGroup: PropTypes.any,
  img: PropTypes.any,
  name: PropTypes.any,
}
TDprice.propTypes = {
  price: PropTypes.number,
}
TDquantitiy.propTypes = {
  quantity: PropTypes.number,
  handleQuantityChange: PropTypes.func,
}
export default (ProductTableRow);



//onClick={ () => addToCart( prod.id, prod.NUM_id+'-'+prod.NUM_variant, quantity ) } 