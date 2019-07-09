
/** [] Imported @ 
 * src/views-bootstrap/Special_Info/special.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { useState } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Button from 'react-bootstrap/Button'
  import Lightbox from 'lightbox-react'
// [] my components
  //import SpecialImages from './special_images'
// [] my images
  import { SpecialImages } from '../../functions/import_images'

// -------------------------------------------------------------------------------

const SpecialTableRow = ( { pass_data } ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageArr, setImageArr] = useState(0);

  switch(pass_data.Number) {
    case'-1':
      return (
      <tr className="my_special_tr_gap my_noHover">
        <td colSpan="3"></td>
      </tr>
      )
    case '0':
      return (
        <tr className="my_special_tr_title my_noHover">
          <td colSpan="3">{ pass_data.Title_rus }</td>
        </tr>
      )
    default: 
      if(pass_data.Images !== '') {
        return (
          <tr className="my_special_tr">          
            <td>{ pass_data.Number }</td>
            <td>{ pass_data.Title_rus }</td>  
            <td>
              <Button 
                key={pass_data.ID_data} 
                className="my_spec_btn" 
                variant="primary" 
                onClick={ () => { setIsOpen(true); setImageArr( pass_data.Images.split('; ') ); } }
              >
                Снимки
              </Button>
            </td>

              {isOpen && imageArr.length === 1 && (               
                <Lightbox  
                  mainSrc={ SpecialImages[ imageArr[ imageIndex ] ] }
                  onCloseRequest={ () => setIsOpen(false)  }
                />
              )}
              {isOpen && imageArr.length > 1 && (  
                <Lightbox  
                  mainSrc={ SpecialImages[ imageArr[ imageIndex ] ] }
                  nextSrc={ SpecialImages[ imageArr[ (imageIndex + 1) % imageArr.length ] ] }
                  prevSrc={ SpecialImages[ imageArr[ (imageIndex + imageArr.length - 1) % imageArr.length ] ] }
                  onCloseRequest={ () => setIsOpen(false)  }
                  onMovePrevRequest={ () =>
                    setImageIndex( (imageIndex + imageArr.length - 1) % imageArr.length )
                  }
                  onMoveNextRequest={ () =>
                    setImageIndex( (imageIndex + 1) % imageArr.length )
                  }
                />
              )}

          </tr>
        )
      } else {  
        return(
          <tr className="my_special_tr ">       
            <td>{ pass_data.Number }</td>
            <td colSpan="2">{ pass_data.Title_rus }</td>   
          </tr>
        )
      }  
  } 
}

SpecialTableRow.propTypes = {  
  pass_data: PropTypes.any,
}
export default (SpecialTableRow);