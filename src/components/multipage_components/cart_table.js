
/** [] Imported @ 
 * src/views/Checkout/checkout.js
 * 
 * manualy updated 28/08/2019
*/ 

// [] fundemental components
    import React from "react"
    import { connect } from 'react-redux'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Table } from 'react-bootstrap'
    import Currency from 'react-currency-formatter'
// [] my components
    import GetLabel from '../functions/process_label'
    import CartTableRow from './cart_tableRow'
// [] my images
    //import LoadingGIF from '../../../../images/icons/modela_loading.gif'

// -------------------------------------------------------------------------------

const CartItemTable = ( props ) => {
    //[] requiered props
        const { prop_cart, prop_lang, RemoveFromCart, tableType } = props;
    //[] component-wide defenition of sub-totals
        let subtotal_EU=0;
        let subtotal_EXPORT=0; 
    //[] column title order, if changing, see also [cart_tableRow]
        const tableColOrderCART = [ 'number', 'qunatity', 'total_price_vat', 'total_price_noVat', 'remove' ];
        const tableColOrderCHECKOUT = [ 'number', 'qunatity', 'total_price_vat', 'total_price_noVat' ];        
        const tableOrder = ( tableType === 'cart' ? tableColOrderCART : tableColOrderCHECKOUT );
    //

    // []   
        return(      
            <Table responsive striped variant="light" className="myCart_table">
                <thead>
                    <tr>                      
                    {
                        tableOrder.map( (elem, index) => {
                            return (                            
                                <th key={ index } className="align-middle">
                                    { GetLabel( prop_lang, 'table', elem ) }
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
    // 
}

const mapStateToProps = (state) => ({
    prop_lang: state.rootLang.lang,
    prop_cart: state.rootCart.redu_cartItems, 
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

    RemoveFromCart: PropTypes.func
};
  
  export default connect( mapStateToProps, mapDispatchToProps )(CartItemTable)