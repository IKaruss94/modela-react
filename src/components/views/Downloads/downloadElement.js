
/** [] Imported @ 
 * src/views-bootstrap/Downloads/downloads.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Img from 'react-image'
  import Button from 'react-bootstrap/Button'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const downloadElement = ({ download, image, prop_lang }) => {
    return(    
      <div className="my_downloadCard card">   
        <Img className="my_dl_image img-rounded img-responsive"
            src={[
              image[download.Image] 
            ]}
            unloader={
                <div className="my_dl_noImage">No image [{download.Image}]</div>
            }
        />    
        <h3 className="span my_dl_text">{ download[prop_lang] }</h3>
        <a
          href="../../../../download-files/"
          download={download.Filename}
        >
          <Button 
            className="my_dl_Btn"
            variant="primary" 
          >
            Download
          </Button>
        </a>
      </div>  
    )
}

downloadElement.propTypes = {
  download: PropTypes.any,
  image: PropTypes.any,
  prop_lang: PropTypes.any,
};

export default downloadElement;