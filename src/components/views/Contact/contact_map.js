
/** [] Imported @ 
 * src/views-bootstrap/Card/card.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from "react"
// [] structure and style components
    import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// [] my components
// [] my images

// -------------------------------------------------------------------------------
/**
 * The reason this dosent work is = gooogl map api => billing
 * 
 * https://console.cloud.google.com/apis/dashboard?authuser=1&project=modela-react&supportedpurview=project
 * 
 * posible answer
 * https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
 */

const mapAPIkey = 'AIzaSyCami9S3dRFJsCHDQJz2mD2LJfdISLQo8k';
const ContactMap = () => {
    return (
        <LoadScript
          id = "script-loader"
          googleMapsApiKey = {mapAPIkey}
        >
            <GoogleMap
                id='contact_map'
                className="my_contactMap"
                mapContainerStyle={{
                    height: "512px",
                    width: "100%"
                }}                
                zoom={15}
                center={{
                    lat: 56.5238241,
                    lng: 21.0047136
                }}
            >

                <Marker
                    onLoad={marker => {
                        console.log('marker: ', marker)
                    }}
                    position={{
                        lat: 56.5238241,                            
                        lng: 21.0053644
                    }}
                />

            </GoogleMap>            
        </LoadScript>
    )
}

export default ContactMap


