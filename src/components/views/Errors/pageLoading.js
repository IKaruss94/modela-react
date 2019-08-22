
/** [] Imported @ 
 * every [ Class] component
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from 'react'
// [] structure and style components
// [] my components
// [] my images
  import LoadingGif from '../../../../images/icons/modela_loading.gif'

// -------------------------------------------------------------------------------

function PageLoading() {
        
    //console.log('--- loading :', location);
    return (
        <div className="my_pageLoading container my_centered">
            <img src={LoadingGif} alt="loading" height="100" width="100" />
        </div>
    );
}

export default PageLoading