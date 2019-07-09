
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

const PrepOwnerHTML = ( order, form_client, form_delivery, payment  ) => {

    const fieldNames = {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        address: 'Address',
        city: 'City',
        zip: 'ZIP',
        state: 'State',
        country: 'Country',
        phone: 'Phone number',

        del_name: 'Full name',
        del_address: 'Address',
        del_city: 'City',
        del_zip: 'ZIP',
        del_state: 'State',
        del_country: 'Country',
        del_phone: 'Phone number',
    }


    let client_html = (
        <html>
            <body style={{ 
                maxWidth: '800px',
                margin: '30px auto',
                padding: '10px 20px 30px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontFamily: 'Verdana, Arial',
            }}>
                <header>
                    <h2>Your order with &quot;Modela-L&quot;</h2>
                    <h3>Order date: <Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment></h3>
                    <h3>Payment method : { payment[0].value }</h3>
                </header>

                <hr />

                <div style={{ 
                    width: '100%',
                    display: 'inline-block',
                    padding: '10px 0px 0px',
                }}>
                    <div style={{ 
                        width: '49%',
                        display: 'block',
                        float: 'left',
                    }}>
                        <table 
                            rules="all" 
                            cellPadding="10"
                            style={{ 
                                width: '100%',
                                margin: 'auto',
                                border: '1px solid black',
                            }}
                        >   
                            <thead>
                                <th colSpan="2">Customer information</th>
                            </thead>
                            <tbody>
                            {
                                form_client.map( ( dataField, index ) => {
                                    return(
                                        <tr key={index}>
                                            <td><strong>{ fieldNames[dataField.name] }</strong> </td>
                                            <td>{ dataField.value }</td>
                                        </tr>
                                    )
                                })
                            }     
                            </tbody>
                        </table>
                    </div>

                    <div style={{ 
                        width: '49%',
                        display: 'block',
                        float: 'right',
                    }}>
                    {
                        form_delivery.length === 0 ? (
                            <p>No shipping data provided. Client data will be used for shipping info.</p>
                        ) : (
                            <table 
                                rules="all" 
                                cellPadding="10"
                                style={{ 
                                    width: '100%',
                                    margin: 'auto',
                                    border: '1px solid black',
                                }}
                            >  
                                <thead>
                                    <th colSpan="2">Shipping information</th>
                                </thead>
                                <tbody>
                                {
                                    form_delivery && form_delivery.map( ( dataField, index ) => {
                                        return(
                                            <tr key={index}>
                                                <td><strong>{ fieldNames[dataField.name] }</strong> </td>
                                                <td>{ dataField.value }</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        )
                    }
                    </div>
                </div>                
                
                <hr />

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

PrepOwnerHTML.propTypes = {  
    order: PropTypes.any,
    form_client: PropTypes.any,
    form_delivery: PropTypes.any,
    payment: PropTypes.any,
}
export default (PrepOwnerHTML);