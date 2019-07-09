
/** [] Imported @ 
 * src/views-bootstrap/index.js
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

function NoMatch({ location }) {
    return (
        <div className="my_pageNotFound container center">
            <h3>
                404 [page not found] : <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

NoMatch.propTypes = {
    location: PropTypes.any
  };
export default NoMatch