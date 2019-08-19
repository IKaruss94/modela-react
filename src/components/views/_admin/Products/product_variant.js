
/** [] Imported @ 
 * src/components/views/_admin/Products/product_modal.js
 * 
 * manualy updated 06/08/2019
*/ 

// [] fundemental components
    import React, {useState} from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Row, Col, Button, Table  } from 'react-bootstrap'
    import { Formik, Form, Field, ErrorMessage } from 'formik' 
    import * as yup from 'yup'     
    import Select from 'react-select'
//import Swal from 'sweetalert2'

// -------------------------------------------------------------------------------

function ProductVariant( props ) {    

    const [selectedOption, setSelectedOption] = useState( props.selectOptions[props.variantData.Category -1] );
    //const [initVal] = useState( props.variantData );

    // [] some event handlers
        const checkboxChange = ( props ) => {
            const currentState = !props.value;
        
            props.setFieldValue( props.name, currentState);    
            //console.log( props.name, ' updated ', currentState);  
        }
        const selectChange = ( props ) => {    
            const currentValue = props.chosenValue;
         
            setSelectedOption( currentValue );        
            props.setFieldValue( props.name, currentValue.value);        
            //console.log( props.name, ' updated ', currentValue.value);  
        } 
    //   
    // [] some function componets
        const TableTitle = (props) => { // { tableHeader }
            return(            
                <thead>
                    <tr className="align-middle">
                        <td colSpan="2" className="my_adminProd_tableTitle">
                            <h3>{ props.tableHeader }</h3>
                        </td>
                    </tr>
                </thead>
            )
        }
        const TableInputField = (props) => { // { name, type, errors, touched }    
            //  <lable htmlFor={ props.name }>{ props.title }</lable>
            return(   
                <tr> 
                    <td>
                        <span>{ props.title }</span>
                    </td> 
                    <td>
                        <Field type={ props.type } name={ props.name } /> 
                        <ErrorMessage name={ props.name }  component='div' />
                    </td>   
                </tr> 
            )    
        }
        const TableCheckboxField = (props) => {  
            return(   
                <tr> 
                    <td>
                        <span>{ props.title }</span>
                    </td> 
                    <td>
                        <input 
                            type="checkbox" 
                            name={ props.name } 
                            className = "my_admin_prodCheckbox"
                            checked = { props.values[props.name] }
                            onBlur = { props.handleBlur }
                            onChange = { () => checkboxChange({name: props.name, value: props.values[props.name], setFieldValue: props.setFieldValue }) }
                        /> 
                    </td>   
                </tr> 
            )    
        }
    //  

    //
        // [] form initial value, defines form as controlled
            const adminProd_initVal = {
                Available: props.variantData.Available,
                Base: props.variantData.Base,
                Bogies: props.variantData.Bogies,
                Category: props.variantData.Category,
                Color: props.variantData.Color,
                Coupler: props.variantData.Coupler,
                Dimensions: props.variantData.Dimensions,
                Era: props.variantData.Era,
                IMG_emblem: props.variantData.IMG_emblem,
                IMG_large: props.variantData.IMG_large,
                IMG_tooltip: props.variantData.IMG_tooltip,
                Images: props.variantData.Images,
                NUM_id: props.variantData.NUM_id,
                NUM_variant: props.variantData.NUM_variant,
                Name: props.variantData.Name,
                Price_export_eu: props.variantData.Price_export_eu,
                Price_vat_eu: props.variantData.Price_vat_eu,
                Producer: props.variantData.Producer,
                Regist_num: props.variantData.Regist_num,
                Type: props.variantData.Type,
                User: props.variantData.User,
                Vat_eu: props.variantData.Vat_eu,
                Visable: props.variantData.Visable,
                Weight: props.variantData.Weight,
                Years: props.variantData.Years,
            };
        // [] form requierment schema
            const adminProd_validSchema = yup.object().shape({   
                Available: yup,
                Base: yup.string(),
                Bogies: yup.string(),
                Category: yup,
                Color: yup.string(),
                Coupler: yup.string(),
                Dimensions: yup.string(),
                Era: yup.string(),
                IMG_emblem: yup,
                IMG_large: yup,
                IMG_tooltip: yup,
                Images: yup,
                NUM_id: yup.string().required('Required'),
                NUM_variant: yup.string().required('Required'),
                Name: yup.string().required('Required'),
                Price_export_eu: yup.number().required('Required'),
                Price_vat_eu: yup.number().required('Required'),
                Producer: yup.string(),
                Regist_num: yup.string(),
                Type: yup.string(),
                User: yup.string(),
                Vat_eu: yup.number(),
                Visable: yup,
                Weight: yup.string(),
                Years: yup.string(),
            });
    //
                                          
    return(
        <Formik
        
            initialValues = { adminProd_initVal }
            validationSchema = { adminProd_validSchema }
            validateOnChange

            onSubmit = { ( endValues ) => {
                const initVal = props.variantData;
                const id = props.variantData.id;                
                let changedValues = [];

                Object.keys(initVal).map( elem_key => {
                    if( initVal[elem_key] !== endValues[elem_key] )
                        changedValues.push({ key: elem_key, before: initVal[elem_key], after: endValues[elem_key] });
                });

                console.log('submiting - ['+ id +'] :', changedValues);
            }}
        >
        {({
            errors, 
            status,
            touched,

            values,
            handleBlur,
            handleSubmit,
            setFieldValue,

            isSubmitting,
        }) => (
            <Form>
                <Row>                                        
                    <Button 
                        //type = "submit"
                        disabled = { isSubmitting }
                        variant="primary" 
                        block
                        className="my_admin_btn"
                        onClick={ handleSubmit }
                    >SUBMIT</Button>
                </Row>
                <Row>     
                    <Col>
                        <Table striped variant="light" className="my_admin_prodBaseTable">
                            <TableTitle tableHeader="Base information" />
                            <tbody>
                                <TableInputField type="text" title="ID" name='NUM_id' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Variant" name='NUM_variant'  errors={errors} status={status} touched={touched} />

                                <TableCheckboxField name="Visable" title="Visable" values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                                <TableCheckboxField name="Available" title="Available" values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                                        
                                <tr> 
                                    <td>
                                        <span>Category</span>
                                    </td> 
                                    <td>  
                                        <Select
                                            name = 'admin_prod_category'                                                                
                                            isClearable={false}
                                            isSearchable={false}
                                            defaultValue={ props.selectOptions[props.variantData.Category -1] }
                                            value= { selectedOption }
                                            options = { props.selectOptions }
                                            onChange = { (chosenValue) => selectChange({ chosenValue, name:'Category', setFieldValue }) }
                                        /> 
                                    </td>   
                                </tr> 

                            </tbody>
                        </Table>
                        
                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                                
                            <TableTitle tableHeader="Pricing information" />
                            <tbody>
                                <TableInputField type="number" title="No VAT / export (eur)" name='Price_export_eu' errors={errors} status={status} touched={touched} />
                                <TableInputField type="number" title="With VAT (eur)" name='Price_vat_eu' errors={errors} status={status} touched={touched} />
                                <TableInputField type="number" title="VAT (eur)" name='Vat_eu' errors={errors} status={status} touched={touched} />
                            </tbody>
                        </Table>
                    </Col>

                    <Col>
                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                          
                            <TableTitle tableHeader="Details" />
                            <tbody>                                                    
                                <TableInputField type="text" title="Name" name='Name' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Type" name='Type' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Registration number" name='Regist_num' errors={errors} status={status} touched={touched} />

                                <TableInputField type="text" title="Dimensions" name='Dimensions' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Weight" name='Weight' errors={errors} status={status} touched={touched} />

                                <TableInputField type="text" title="Color" name='Color' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Base" name='Base' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Bogies" name='Bogies' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Coupler" name='Coupler' errors={errors} status={status} touched={touched} />

                                <TableInputField type="text" title="Era" name='Era' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Producer" name='Producer' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="User" name='User' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Years" name='Years' errors={errors} status={status} touched={touched} />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                              
                            <TableTitle tableHeader="Images" />
                            <tbody>                                                    
                                <TableInputField type="text" title="Emblem" name='IMG_emblem' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Product header" name='IMG_large' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Tooltip" name='IMG_tooltip' errors={errors} status={status} touched={touched} />
                                <TableInputField type="text" title="Extar images" name='Images' errors={errors} status={status} touched={touched} />
                            </tbody>
                        </Table>
                    </Col>
                </Row>                                    
            </Form>
        )}
        </Formik>             
    )
}


ProductVariant.propTypes = {  
    product: PropTypes.any,
    variantData: PropTypes.any,
    selectOptions: PropTypes.any,

    chosenValue: PropTypes.any,
    name: PropTypes.any,
    title: PropTypes.any,
    type: PropTypes.any,
    value: PropTypes.any,
    values: PropTypes.any,
    tableHeader: PropTypes.any,
    handleBlur: PropTypes.func,
    setFieldValue: PropTypes.func,    
}
export default (ProductVariant);


/**
* 
* 
                                                <ProductTD type="text" title="ID" name='NUM_id' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Variant" name='NUM_variant' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="bool" title="Visable" name='Visable' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="bool" title="Available" name='Available' data={values} formik_handleChange={handleChange} />
                                                <tr> <td>Category { elem.Category }[maybe add a dropdown]</td> </tr>
                                            </tbody>
                                        </Table>
                                        
                                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                                
                                            <TableTitle tableHeader="Pricing information" />
                                            <tbody>
                                                <ProductTD type="currency" title="No VAT / export (eur)" name='Price_export_eu' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="currency" title="With VAT (eur)" name='Price_vat_eu' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="currency" title="VAT (eur)" name='Vat_eu' data={values} formik_handleChange={handleChange} />
                                            </tbody>
                                        </Table>
                                    </Col>

                                    <Col>
                                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                          
                                            <TableTitle tableHeader="Details" />
                                            <tbody>                                                    
                                                <ProductTD type="text" title="Name" name='Name' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Type" name='Type' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Registration number" name='Regist_num' data={values} formik_handleChange={handleChange} />

                                                <ProductTD type="text" title="Dimensions" name='Dimensions' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Weight" name='Weight' data={values} formik_handleChange={handleChange} />

                                                <ProductTD type="text" title="Color" name='Color' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Base" name='Base' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Bogies" name='Bogies' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Coupler" name='Coupler' data={values} formik_handleChange={handleChange} />

                                                <ProductTD type="text" title="Era" name='Era' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Producer" name='Producer' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="User" name='User' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Years" name='Years' data={values} formik_handleChange={handleChange} />
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Table responsive striped variant="light" className="my_admin_prodBaseTable">                                              
                                            <TableTitle tableHeader="Images" />
                                            <tbody>                                                    
                                                <ProductTD type="text" title="Emblem" name='IMG_emblem' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Product header" name='IMG_large' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Tooltip" name='IMG_tooltip' data={values} formik_handleChange={handleChange} />
                                                <ProductTD type="text" title="Extar images" name='Images' data={values} formik_handleChange={handleChange} />
*/