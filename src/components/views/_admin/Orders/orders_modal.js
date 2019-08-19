
/** [] Imported @ 
 * src/components/views/_admin/Product/products.js
 * 
 * manualy updated 06/08/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Modal, Form, Button } from 'react-bootstrap'
    import Moment from 'react-moment'
    import Currency from 'react-currency-formatter'
// [] my components

// -------------------------------------------------------------------------------

function PrepData( order_data, prods ){

    let client_data = [];
    let delivery_data = [];
    let ordered_items = [];
    let subtotal_EU = 0;
    let subtotal_EXPORT = 0;  

    const client_fieldNames = {
        Cust_fullName: 'Full name',
        Cust_email: 'E-mail',
        Cust_address: 'Address',
        Cust_city: 'City',
        Cust_zip: 'ZIP',
        Cust_state: 'State',
        Cust_country: 'Country',
        Cust_phone: 'Phone number',
        Cust_fax: 'Fax'
    };
    const delivery_fieldNames = {
        Dest_name: 'Full name',
        Dest_address: 'Address',
        Dest_city: 'City',
        Dest_zip: 'ZIP',
        Dest_state: 'State',
        Dest_country: 'Country',
        Dest_phone: 'Phone number',
    };

    // [] ordering and applying some proper names
        Object.keys(client_fieldNames).map( (key) => {
            if( key === 'Cust_fullName' && order_data[key] === ''){
                client_data.push({ name: client_fieldNames.Cust_fullName, value: (order_data.Cust_name+' '+order_data.Cust_lastname)  });  
            } else {
                client_data.push({ name: client_fieldNames[key], value: order_data[key]  });  
            }                  
        });

        Object.keys(delivery_fieldNames).map( (key) => {
            delivery_data.push({ name: delivery_fieldNames[key], value: order_data[key]  });                    
        });
    //  

    // [] prepering ordered items
        //[] spliting items and putting in an object array
            let temp_order = [];
            order_data.Ordered_items.split(';').map( elem => {
                if( elem === " " ){ return; }
                let split_elem = elem.split('=');
                temp_order.push({ id: split_elem[0].trim(), quantity: split_elem[1].trim() });
            }); 
            console.log(temp_order);
        //

        //[] find the prices
            temp_order.sort(function(a, b) {
                const split_a = a.id.split('-');
                const split_b = b.id.split('-');            

                return split_a[0] === split_b[0] ? ( split_a[1] - split_b[1] ):( split_a[0] - split_b[0] )
            });
        //
      

        prods && prods.map( prod => {
            temp_order.map( elem => {
                if( elem.id.split('-')[0] === prod.NUM_id && elem.id.split('-')[1] === prod.NUM_variant ){

                    ordered_items.push({ id: elem.id, quantity: elem.quantity, price_eu: prod.Price_vat_eu, price_export: prod.Price_export_eu });
                    subtotal_EU = subtotal_EU + (elem.quantity * prod.Price_vat_eu);
                    subtotal_EXPORT = subtotal_EXPORT + (elem.quantity * prod.Price_export_eu);

                }
            });
        });  

        console.log('in the end', ordered_items);
    //


    return({ client_data, delivery_data, ordered_items, subtotal_EU, subtotal_EXPORT });
}

function OrderModal( props ) {  

    //console.log('order modal props ',props);
    if( props.data === null || props.prod === null ) return(null);  

    const separatedData = PrepData( props.data, props.prod);
    console.log('nans', separatedData);
    
  

    return(       
        <Modal 
            {...props} 
            size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
        > 
            <Form className="my_adminOrder_modal">

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="my_adminProd_modalTitle">
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>    

                    <div style={{ 
                        maxWidth: '800px',
                        margin: '30px auto',
                        padding: '10px 20px 30px',
                        overflow: 'hidden',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        fontFamily: 'Verdana, Arial',
                    }}>
                        <div style={{ 
                            width: '100%',
                            display: 'inline-block',
                            padding: '10px 0px 0px',
                        }}>
                            <header style={{ margin: '16px' }}>
                                <h3>Order date: <Moment format="DD/MM/YYYY HH:mm">{ props.data.Started_on }</Moment></h3>
                                <h3>Payment method : { props.data.Pay_method }</h3>
                            </header>
                            <div>
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
                                        separatedData.client_data.map( ( dataField, index ) => {
                                            return(
                                                <tr key={index}>
                                                    <td><strong>{ dataField.name }</strong> </td>
                                                    <td>{ dataField.value }</td>
                                                </tr>
                                            )
                                        })
                                    }     
                                    </tbody>
                                </table>
                            </div>

                            <div >
                            {
                                separatedData.delivery_data[0].value === "" ? (
                                    <p style={{ margin: '16px', fontWeight: 'bold', fontSize: '20px' }}>No extra shipping data was provided.</p>
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
                                            separatedData.delivery_data && separatedData.delivery_data.map( ( dataField, index ) => {
                                                return(
                                                    <tr key={index}>
                                                        <td><strong>{ dataField.name }</strong> </td>
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
                                <th>Quantity</th>
                                <th>Price (EU)</th>
                                <th>Price (Export)</th>
                            </thead>
                            <tbody>
                                {
                                    separatedData.ordered_items && separatedData.ordered_items.map( ( dataField, index ) => {
                                        return(
                                            <tr key={index}>
                                                <td>{ dataField.id }</td>      
                                                <td>{ dataField.quantity }</td>     
                                                <td>
                                                    <Currency
                                                        quantity={dataField.price_eu * dataField.quantity}
                                                        currency="EUR"
                                                    />
                                                </td>    
                                                <td>
                                                    <Currency
                                                        quantity={dataField.price_export * dataField.quantity}
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
                                    <td colSpan="2" style={{ textAlign: 'right' }} >Sub-totlas : </td>   
                                    <td>{ separatedData.subtotal_EU.toFixed(2) }</td>  
                                    <td>{ separatedData.subtotal_EXPORT.toFixed(2) }</td>          
                                </tr>
                            </tbody>
                        </table>        

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="danger"
                        className="my_admin_btn"
                        size="lg" 
                        onClick={props.onHide}
                    >Close</Button>
                </Modal.Footer>

                
            </Form>
        </Modal>
    )
}

OrderModal.propTypes = {  
    onHide: PropTypes.any,
    data: PropTypes.any,
    prod: PropTypes.any,
}
export default (OrderModal);