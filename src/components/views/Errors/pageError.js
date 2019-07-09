
/** [] Imported @ 
 * every [Class] component
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
// [] my components
// [] my images

// -------------------------------------------------------------------------------

function PageError({ errMsg }) {
    return (
        <div className="my_pageLoading container center">
            ERROR: {errMsg}
        </div>
    );
}

PageError.propTypes = {
    errMsg: PropTypes.any
  };
export default PageError