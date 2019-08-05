
/** [] Imported @ 
 * src/components/views/_admin/products.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Modal, Row, Col, Button, Table, Form } from 'react-bootstrap'
    import Collapsible from 'react-collapsible'
    import { Formik } from 'formik'
    import CurrencyInput from 'react-currency-masked-input'
    //import Swal from 'sweetalert2'

// -------------------------------------------------------------------------------

const ProductTD = ({ type, title, name, data, formik_change }) => {
    switch(type){
        case'bool': {              
            return data ? (
                <tr>                            
                    <td>
                        <Form.Label className="my_admin_prodFormLable">{ title }</Form.Label>
                    </td>
                    <td>
                        <Form.Control 
                            type='checkbox' 
                            name={ name } 
                            onChange={ formik_change } 
                        />
                    </td>   
                </tr> 
            ) : (        
                <tr>       
                    <td>
                        <Form.Label className="my_admin_prodFormLable">{ title }</Form.Label>
                    </td>
                    <td>
                        <Form.Control 
                            type='checkbox' 
                            name={ name } 
                            onChange={ formik_change } 
                        />
                    </td>   
                </tr> 
            )
        }
        case'currency': {
            return(                
                <tr> 
                    <td>
                        <Form.Label className="my_admin_prodFormLable">{ title }</Form.Label>
                    </td>
                    <td> <CurrencyInput 
                        name={ name } 
                        value={ data[name] } 
                        onChange={ formik_change }  
                    /> </td>
                </tr> 
            )
        }
        default: {                    
            return(
                <tr> 
                    <td>
                        <Form.Label className="my_admin_prodFormLable">{ title }</Form.Label>
                    </td>
                    <td>
                        <Form.Control 
                            type={type} 
                            name={name} 
                            value={ data[name] } 
                            onChange={ formik_change }  
                        />
                    </td>    
                </tr> 
            )
        }
    }
}

const ProductDetails = ( props ) => {    

//[] some variables
    const { prod_id, prod_all } = props;
    let prod_varinats = [];

//[] getting only the relevent products, ones with the right [NUM_id]
    prod_all && prod_all.map(elem_prod => {  
        if( elem_prod.NUM_id === prod_id ) prod_varinats.push( elem_prod );
    })

//[] retuning
    return(       
        <Modal {...props} className="my_admin_prodModal" aria-labelledby="contained-modal-title-vcenter"> 
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{ prod_id }</Modal.Title>
            </Modal.Header>


            <Modal.Body>
                {
                    prod_varinats && prod_varinats.map( (elem, index) => {
                        
                        const longID = elem.NUM_id +' - '+ elem.NUM_variant;                        
                        const InitValues = {
                            Available: elem.Available,
                            Base: elem.Base,
                            Bogies: elem.Bogies,
                            Category: elem.Category,
                            Color: elem.Color,
                            Coupler: elem.Coupler,
                            Dimensions: elem.Dimensions,
                            Era: elem.Era,
                            IMG_emblem: elem.IMG_emblem,
                            IMG_large: elem.IMG_large,
                            IMG_tooltip: elem.IMG_tooltip,
                            Images: elem.Images,
                            NUM_id: elem.NUM_id,
                            NUM_variant: elem.NUM_variant,
                            Name: elem.Name,
                            Price_export_eu: elem.Price_export_eu,
                            Price_vat_eu: elem.Price_vat_eu,
                            Producer: elem.Producer,
                            Regist_num: elem.Regist_num,
                            Type: elem.Type,
                            User: elem.User,
                            Vat_eu: elem.Vat_eu,
                            Visable: elem.Visable,
                            Weight: elem.Weight,
                            Years: elem.Years,
                        };

                        return(
                            <Collapsible key={index} trigger={ longID }>  
                                <Formik
                                    initialValues = { InitValues }
                                    validateOnChange
                                    onSubmit = { ( InitValues, EndValues ) => {
                                        let changedValues = [];
                                        Object.keys(InitValues).map( elem_key => {
                                            if( InitValues[elem_key] !== EndValues[elem_key] )
                                                changedValues.push({ key: elem_key, value: EndValues[elem_key] });
                                        });
                                        console.log('submiting - prod['+ longID +']:', changedValues);
                                    }}
                                >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    //setFieldValue,
                                    values,
                                }) => (

                                <Form>
                                    <Row>                                        
                                        <Button 
                                            variant="primary" 
                                            size="lg" 
                                            onClick={ () => { handleSubmit(InitValues, values); } }
                                        >SUBMIT</Button>
                                    </Row>
                                    <Row>     
                                        <Col>
                                            <Table responsive striped variant="light" className="my_admin_prodBaseTable">
                                                <thead>
                                                    <tr colSpan={2} className="align-middle"> Base information</tr>
                                                </thead>
                                                <tbody>
                                                    <ProductTD type="text" title="ID" name='NUM_id' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Variant" name='NUM_variant' data={values} formik_change={handleChange} />
                                                    <ProductTD type="bool" title="Visable" name='Visable' data={values} formik_change={handleChange} />
                                                    <ProductTD type="bool" title="Available" name='Available' data={values} formik_change={handleChange} />
                                                    <tr> <td>Category</td><td>{ elem.Category }[maybe add a dropdown]</td> </tr>
                                                </tbody>
                                            </Table>
                                            
                                            <Table responsive striped variant="light" className="my_admin_prodBaseTable">
                                                <thead>
                                                    <tr colSpan={2}> Pricing information</tr>
                                                </thead>
                                                <tbody>
                                                    <ProductTD type="currency" title="No VAT / export (eur)" name='Price_export_eu' data={values} formik_change={handleChange} />
                                                    <ProductTD type="currency" title="With VAT (eur)" name='Price_vat_eu' data={values} formik_change={handleChange} />
                                                    <ProductTD type="currency" title="VAT (eur)" name='Vat_eu' data={values} formik_change={handleChange} />
                                                </tbody>
                                            </Table>
                                        </Col>

                                        <Col>
                                            <Table responsive striped variant="light" className="my_admin_prodBaseTable">
                                                <thead>
                                                    <tr colSpan={2}> Details </tr>
                                                </thead>
                                                <tbody>                                                    
                                                    <ProductTD type="text" title="Name" name='Name' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Type" name='Type' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Registration number" name='Regist_num' data={values} formik_change={handleChange} />

                                                    <ProductTD type="text" title="Dimensions" name='Dimensions' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Weight" name='Weight' data={values} formik_change={handleChange} />

                                                    <ProductTD type="text" title="Color" name='Color' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Base" name='Base' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Bogies" name='Bogies' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Coupler" name='Coupler' data={values} formik_change={handleChange} />

                                                    <ProductTD type="text" title="Era" name='Era' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Producer" name='Producer' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="User" name='User' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Years" name='Years' data={values} formik_change={handleChange} />
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Table responsive striped variant="light" className="my_admin_prodBaseTable">
                                                <thead>
                                                    <tr colSpan={2}> Images </tr>
                                                </thead>
                                                <tbody>                                                    
                                                    <ProductTD type="text" title="Emblem" name='IMG_emblem' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Product header" name='IMG_large' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Tooltip" name='IMG_tooltip' data={values} formik_change={handleChange} />
                                                    <ProductTD type="text" title="Extar images" name='Images' data={values} formik_change={handleChange} />
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>                                    
                                </Form>
                                )}
                                </Formik>      


                            </Collapsible>
                        )
                        
                    })
                }
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>



        </Modal>
    )
}


ProductDetails.propTypes = {  
    match: PropTypes.any,
    product: PropTypes.any,
    onHide: PropTypes.any,

    prod_id: PropTypes.any,
    prod_all: PropTypes.any,
}
export default (ProductDetails);