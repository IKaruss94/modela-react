
/** [] Imported @ 
 * src/views-bootstrap/Special_Info/special.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
import React from 'react'
import PropTypes from 'prop-types'
// [] structure and style components
import Button from 'react-bootstrap/Button'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const SpecialImages = ( { images } ) => {
    console.log(pass_data);

    return(
        <tr className="my_special_tr">          
        <td>{ pass_data.Number }</td>
        <td>{ pass_data.Title_rus }</td>  
        <td>
            <Button 
            key={pass_data.ID_data} 
            className="my_spec_btn" 
            variant="primary" 
            onClick={ () => { ShowSpecialImages(pass_data.Images) } }
            >
            Images
            </Button>
        </td>
        </tr>
    )
  
}

SpecialImages.propTypes = {  
pass_data: PropTypes.any,
}
export default (SpecialImages);