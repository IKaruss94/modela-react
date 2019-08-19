
/** [] Imported @ 
 * src/components/views/_admin/Product/products.js
 * 
 * manualy updated 06/08/2019
*/ 

// [] fundemental components
    import React, {useState} from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Modal, Form, Row, Button } from 'react-bootstrap'
// [] my components

// -------------------------------------------------------------------------------

const FormInputField = (props) => {
    return(
        <Row>
            <Form.Group as={Row} className="my_adminLable_formGroup" controlId={props.lang}>
                <Form.Label column sm="4">{props.lang}</Form.Label>
                <Form.Control column sm="8" type="text" value={props.state} onChange={ (e)=>{ props.changeState(e.target.value) } } />
            </Form.Group>
        </Row>
    )
}

function LableModal( props ) {  

    if( props.lable_data === null ) return(null);

    const [eng, setEng] = useState( props.lable_data.ENG);
    const [lat, setLat] = useState( props.lable_data.LAT);
    const [rus, setRus] = useState( props.lable_data.RUS);
    console.log('lable modal', eng);
    return(       
        <Modal 
            {...props} 
            size="xl"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
        > 
            <Form className="my_adminLable_modalForm">

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="my_adminProd_modalTitle">
                        { props.lable_data ? ( props.lable_data.Name ) : ( 'Editing lable' ) }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>       
                    <FormInputField lang="ENG" data={props.lable_data} state={eng} changeState={ setEng } />
                    <FormInputField lang="LAT" data={props.lable_data} state={lat} changeState={ setLat } />
                    <FormInputField lang="RUS" data={props.lable_data} state={rus} changeState={ setRus } />
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="primary"
                        className="my_admin_btn"
                        size="lg" 
                        onClick={ () => { props.handleSubmit({ before: props.lable_data, eng, lat, rus}) } }
                    >Submit</Button>
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

LableModal.propTypes = {  
    onHide: PropTypes.any,
    lable_data: PropTypes.any,
    handleSubmit: PropTypes.func,
}

FormInputField.propTypes = {  
    lang: PropTypes.any,
    data: PropTypes.any,
    state: PropTypes.any,
    changeState: PropTypes.func,
}
export default (LableModal);