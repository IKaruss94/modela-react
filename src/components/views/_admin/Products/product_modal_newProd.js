
/** [] Imported @ 
 * src/components/views/_admin/Product/products.js
 * 
 * manualy updated 06/08/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Modal, Button } from 'react-bootstrap'
// [] my components
    import ProductVariant from './product_variant'

// -------------------------------------------------------------------------------

function ProductModal( props ) { 
    const { prod_id, prod_varinats, options_prod_cat } = props;

    const emptyValues = {
        Available: false,
        Base: "",
        Bogies: "",
        Category: "",
        Color: "",
        Coupler: "",
        Dimensions: "",
        Era: "",
        IMG_emblem: "",
        IMG_large: "",
        IMG_tooltip: "",
        Images: "",
        NUM_id: prod_id,
        NUM_variant: "",
        Name: "",
        Price_export_eu: "",
        Price_vat_eu: "",
        Producer: "",
        Regist_num: "",
        Type: "",
        User: "",
        Vat_eu: "",
        Visable: false,
        Weight: "",
        Years: "",
      };

//[] getting only the relevent products, ones with the right [NUM_id]
  /*  let prod_varinats = [];
    prod_all && prod_all.map(elem_prod => {  
        if( elem_prod.NUM_id === prod_id ) prod_varinats.push( elem_prod );
    })
    */

//[] retuning
    return(       
        <Modal 
            {...props} 
            size="xl"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
        > 
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{ prod_id }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {
                prod_varinats && prod_varinats.map( (elem) => {
                    return(
                        <ProductVariant 
                            key={elem.NUM_id +'-'+ elem.NUM_variant} 
                            variantData={elem} 
                            selectOptions={options_prod_cat} 
                        />
                    ) 
                })
            }
            
                <ProductVariant 
                    key={prod_id +'-new'} 
                    variantData={emptyValues} 
                    selectOptions={options_prod_cat} 
                />
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    variant="danger"
                    size="lg" 
                    block
                    onClick={props.onHide}
                >Close</Button>
            </Modal.Footer>

        </Modal>
    )
}

ProductModal.propTypes = {  
    match: PropTypes.any,
    product: PropTypes.any,
    onHide: PropTypes.any,

    prod_id: PropTypes.any,
    prod_varinats: PropTypes.any,
    options_prod_cat: PropTypes.any, 
}
export default (ProductModal);