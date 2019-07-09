
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
    import React from 'react'
    import PropTypes from 'prop-types'
    import ReactDOMServer from 'react-dom/server'
// [] structure and style components
    import Moment from 'react-moment'
    import 'moment-timezone'
    import Currency from 'react-currency-formatter'
// [] my components
// [] my images

// -------------------------------------------------------------------------------
    /**
     * First name : Last name : E-mail : Address : City : ZIP : State : Country : Phone
     * 
     * Full Name : Address : City : ZIP : State : Country : Phone
     */

const PrepClientHTML = ( order, client_data, delivery_data, payment  ) => {
    let client_html = (
        <html>
            <body style={{ 
                maxWidth: '800px',
                margin: '20px auto',
                padding: '10px 20px 30px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontFamily: 'Verdana, Arial',
            }}>
                <header>
                    <h2>Your order with &quot;Modela-L&quot;</h2>
                    <h3>Order date: <Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment></h3>
                    <h3>
                        Delivery address : { delivery_data === '' ? ( client_data ) : ( delivery_data ) }
                    </h3>
                    <h3>Your chosen payment method : {payment[0].value}</h3>
                </header>
                
                <hr />

                <h3>Break-down  of your order</h3>
                <table 
                    rules="all" 
                    cellPadding="10"
                    style={{ 
                        width: '100%',
                        margin: '20px auto 0px',
                        border: '1px solid black',
                    }}
                > 
                    <thead>
                        <th>Item code</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price (EU)</th>
                        <th>Price (Export)</th>
                    </thead>
                    <tbody>
                        {
                            order && order.map( ( dataField, index ) => {
                                return(
                                    <tr key={index}>
                                        <td>{ dataField.number }</td>    
                                        <td>{ dataField.name }</td>     
                                        <td>{ dataField.quantity }</td>     
                                        <td>
                                            <Currency
                                                quantity={dataField.priec_eu * dataField.quantity}
                                                currency="EUR"
                                            />
                                        </td>    
                                        <td>
                                            <Currency
                                                quantity={dataField.preice_export * dataField.quantity}
                                                currency="EUR"
                                            />
                                        </td>         
                                    </tr>
                                )
                            })                        
                        }
                        <tr style={{ 
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '28px',
                            border: '3px solid #123',
                        }}>
                            <td colSpan="3" style={{ textAlign: 'right' }} >Sub-totlas : </td>   
                            <td>{ payment[1].value }</td>  
                            <td>{ payment[2].value }</td>          
                        </tr>
                    </tbody>
                </table>        

            </body>
        </html>
    )
    return(
        ReactDOMServer.renderToString(client_html)
    );
}

PrepClientHTML.propTypes = {  
    order: PropTypes.any,
    client_data: PropTypes.any,
    delivery_data: PropTypes.any,
    payment: PropTypes.any,
}
export default (PrepClientHTML);