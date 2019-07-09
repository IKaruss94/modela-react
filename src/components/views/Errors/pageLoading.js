
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

// -------------------------------------------------------------------------------

function PageLoading(location) {
        
    console.log('--- loading :', location);
    return (
        <div className="my_pageLoading container center">
            <h3>
                Loading [<code>{ location }</code>] . . .
            </h3>
        </div>
    );
}

export default PageLoading