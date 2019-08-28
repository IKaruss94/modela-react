
/** [] Imported @ 
 * src/components/views/_admin/Product/products.js
 * 
 * manualy updated 06/08/2019
*/ 

// [] fundemental components
    //import React, {useState, Fragment} from 'react'
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Modal, Form, Button } from 'react-bootstrap'
    import ReactHtmlParser from 'react-html-parser'
    //import RichTextEditor from 'react-rte';
// [] my components

// -------------------------------------------------------------------------------

function TextModal( props ) {  
    if( props.text_data === null ) return null;

    //console.log('TextModal', props);    
    return(       
        <Modal 
            {...props} 
            size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
        > 
            <Form className="my_adminLable_modalForm">

                <Modal.Header closeButton>
                    { props.text_data.ForPage }
                 </Modal.Header>

                <Modal.Body> 
                    { ReactHtmlParser( props.text_data[props.text_lang] ) }
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

TextModal.propTypes = {  
    onHide: PropTypes.bool,
    text_lang: PropTypes.string,
    text_data: PropTypes.object,
    handleSubmit: PropTypes.func,
}
export default (TextModal);