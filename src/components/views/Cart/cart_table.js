
/** [] Imported @ 
 * src/views-bootstrap/Checkout/checkout.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from "react"
    import { compose } from 'redux'
    import { connect } from 'react-redux'
    import PropTypes from 'prop-types'
    import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
    import { Table } from 'react-bootstrap'
    import Currency from 'react-currency-formatter'
// [] my components
    import GetLable from '../../functions/process_lable'
    import CartTableRow from './cart_tableRow'
// [] my images
    import LoadingGIF from '../../../../images/icons/modela_loading.gif'

// -------------------------------------------------------------------------------

const CartItemTable = ( props ) => {
    //[] requiered props
        const { prop_cart, prop_lang, prop_lables, RemoveFromCart, tableType } = props;
    //[] component-wide defenition of sub-totals
        let subtotal_EU=0;
        let subtotal_EXPORT=0; 
    //[] column title order, if changing, see also [cart_tableRow]
        const tableColOrderCART = [ 'number', 'qunatity', 'total_price_vat', 'total_price_noVat', 'remove' ];
        const tableColOrderCHECKOUT = [ 'number', 'qunatity', 'total_price_vat', 'total_price_noVat' ];        
        const tableOrder = ( tableType === 'cart' ? tableColOrderCART : tableColOrderCHECKOUT );
    //

    // []
        if ( prop_lables === undefined ) { 
            return(
                <img src={LoadingGIF} style={{ width: '36px', height: '36px' }} />     
            )
        }
        else {    
            return(      
                <Table responsive striped variant="light" className="my_ProductTable">
                    <thead>
                        <tr>                      
                        {
                            tableOrder.map( (elem, index) => {
                                return (                            
                                    <th key={ index } className="align-middle">
                                        { GetLable( prop_lang, prop_lables, 'table', elem ) }
                                    </th>
                                ) 
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prop_cart && prop_cart.map(item => {
                                subtotal_EU = subtotal_EU + (item.quantity * item.priec_eu)
                                subtotal_EXPORT = subtotal_EXPORT + (item.quantity * item.preice_export)
                                return(
                                    <CartTableRow 
                                        key={ item.id }
                                        tableType = { tableType }
                                        cartItem={ item } 
                                        actionRemove= { RemoveFromCart }                                
                                    />
                                );              
                            })         
                        }

                        <tr key="subtotals">
                        <td colSpan="2"></td>
                        <td className="my_cartSubtotal align-middle"> 
                            <Currency
                                quantity={ subtotal_EU }
                                currency="EUR"
                            />
                        </td>
                        <td className="my_cartSubtotal align-middle">
                            <Currency
                                quantity={ subtotal_EXPORT }
                                currency="EUR"
                            />
                        </td>
                        {
                            tableType === 'cart' ? (
                                <td className="align-middle"></td>   
                            ) : null
                        }
                            
                        </tr>

                    </tbody>
                </Table>
            );   
        } // [] end of [else]
    // 
}

const mapStateToProps = (state) => ({
    prop_lang: state.rootLang.lang,
    prop_cart: state.rootCart.redu_cartItems, 
    prop_lables: state.rootFirestore.ordered.lables,
  })
const mapDispatchToProps = (dispatch) => {
    return{
        RemoveFromCart: (id) => { dispatch({ type:'REMOVE_FROM_CART', itemID: id }) }
    }
}
CartItemTable.propTypes = {
    tableType: PropTypes.any,
    prop_cart: PropTypes.any,
    prop_lang: PropTypes.any,
    prop_lables: PropTypes.any,

    RemoveFromCart: PropTypes.func
};
  
  export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect([
      { 
        collection: 'lables'
      }
    ])
  )(CartItemTable)