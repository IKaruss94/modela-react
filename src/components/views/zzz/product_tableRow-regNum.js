
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { useState } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { Form, Button } from 'react-bootstrap'
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

const TDimage = ( imageGroup, img, name ) => {
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
const TDprice = ( price ) => {
  return(         
    <td className="my_prod_tablePrice align-middle">
      <Currency
        quantity={price}
        currency="EUR"
      />
    </td>
  );
}

const ProductTableRow = ( {prod, cartItems, regNum_options, actionAddToCart, actionRemoveFromCart} ) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log('selected :', selectedOption);

  /** [] kit reg-num selector */
    // [] handle change
      const handleChange = (newValue) => {
        setSelectedOption( newValue );
        return newValue;
      }
  /** */
  
  /** [] in-cart checks */
    // [] check [if item already in cart]
      let checkInCart = (elem) => {
        return elem.id === prod.ID_prod
      }
      
    // [] if item added to cart 
      let inCart;
      cartItems.some(checkInCart) ? (
        inCart = <div className="my_prodTable_InCart">
          <LinkContainer to="/checkout">
            <Button className="my_prod_tableBtn" variant="success" title="Proceed to cart"><i className="material-icons">shopping_cart</i></Button>
          </LinkContainer> 
          <Button 
            className="my_prod_tableBtn" 
            variant="danger" 
            title="Remove from cart"
            onClick={ () => { actionRemoveFromCart(prod.ID_prod) } }
          ><i className="material-icons">close</i></Button>
          </div>
      ) : (
        inCart = <span className="my_prodTable_OutCart"></span>
      )
      
  /** */


  if( prod.Available === 1) {
    return(
      <tr key={prod.Number}>
        { prod.Number !== '99' ? ( TDimage( prodTableEra, 'era_'+prod.Era+'.gif', prod.Era) ):(null) }
        { prod.Number !== '99' ? ( TDimage( prodTableUser, prod.Img_emblem, prod.User) ):(null) }
        {
          prod.Number === '99' ? (   
            <td className="align-middle" colSpan={3}>    
              <Select
                className = "basic-single my_prod_regSselect"
                classNamePrefix = "select"
                name = "kit-reg-num"
                options = { regNum_options }  
                defaultValue = { regNum_options[0] }
                onChange = { handleChange }
              />   
            </td>         
          ) : ( 
            <td className="align-middle">{ prod.Regist_num }</td>
          )          
        }
        
        <td className="align-middle">{prod.ID}-{prod.Number}</td>
        <td className="align-middle">{prod.Name}</td>

        { TDprice(prod.Price_vat_eu) }
        { TDprice(prod.Price_export_eu) }

        <td className="align-middle">
          <Form>
            <Form.Control 
              className="my_quntityInput"                 
              key={ prod.Number } 
              type="number" 
              min="1" 
              max="100" 
              placeholder="0"
              value={ quantity }
              onChange={ e => setQuantity(e.target.value) }
            />
          </Form>
        </td>
        <td className="align-middle">
          <Button 
            key={ prod.Number } 
            variant="primary" 
            onClick={ 
              () => actionAddToCart({ 
                id: prod.ID_prod, 
                name: prod.Name, 
                number: prod.ID+'-'+prod.Number, 
                reg_num: prod.Number==='99' ? (selectedOption.value):(prod.Regist_num),
                quantity: quantity,
                priec_eu: prod.Price_vat_eu,
                preice_export: prod.Price_export_eu
              }) 
            } 
            // [addToCart] is in [product.js] because you don't call a disatch from a function component  
          >Add to cart</Button>
        </td>
        <td className="my_prod_tableInCart align-middle">{ inCart }</td> 

      </tr>
    );
  }

  else {
    return (
      <tr key={prod.Number}>        
        { TDimage( prodTableEra, 'era_'+prod.Era+'.gif', prod.Era) }
        { TDimage( prodTableUser, prod.Img_emblem, prod.User) }

        <td className="align-middle">{prod.Regist_num}</td>
        <td className="align-middle">{prod.ID}-{prod.Number}</td>

        { TDprice(prod.Price_vat_eu) }
        { TDprice(prod.Price_export_eu) }

        <td colSpan="3" className="my_prod_notAvailable">Not available</td>
      </tr>
    );
  }
}


ProductTableRow.propTypes = {  
  num: PropTypes.any,
  reg_num: PropTypes.any,
  regNum_options: PropTypes.any,
  selectedOption: PropTypes.any,

  RegNum: PropTypes.func,
}
export default (ProductTableRow);



//onClick={ () => addToCart( prod.ID_prod, prod.ID+'-'+prod.Number, quantity ) } 