
/** [] Imported @ 
 * src/views/Card/card.js
 * 
 * manualy updated 10/09/2019
*/ 

// [] fundemental components
    import React, { Component } from "react"
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

// -------------------------------------------------------------------------------

//Maps JavaScript API = Google Cloud Platform = might requier payments ( billing )

class ContactMap extends Component {

    render(){
        const markerLocation = {
            lat: 56.5238000, 
            lng: 21.0052000
        }

        return (
            <Map
                id='contact_map'
                className="my_contactMap"                
                google={this.props.google}         
                zoom={15}
                initialCenter={ markerLocation }
            >

                <Marker
                    position={ markerLocation }
                />

            </Map>      
        )
    }
}


ContactMap.propTypes = {  
    google: PropTypes.any,
}

export default GoogleApiWrapper({
    apiKey: ''
  })(ContactMap);
