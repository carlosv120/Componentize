import React from 'react'
import { Autocomplete } from '@react-google-maps/api'

const { LoadScript } = require("@react-google-maps/api");
//const { GoogleMap} = require("@react-google-maps/api");
// 
// 
// const containerStyle = {
//     width: '400px',
//     height: '400px'
// };
// 
// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

function MyComponent() {

    var auto = null;

    const onLoad = (autocomplete) => {
        console.log('autocomplete: ', autocomplete)

        auto = autocomplete
    }

    const onPlaceChanged = () => {
        if (auto !== null) {
            console.log(auto.getPlace())
            console.log(auto.getPlace().geometry.location.lat())
            console.log(auto.getPlace().geometry.location.lng())

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }


    return (
        <React.Fragment>

            <label>
                <h5>Address</h5>
            </label>
            <LoadScript
                googleMapsApiKey="AIzaSyDYl5IIXOwXlcYh_x9RnT_dQoNUKWOL96U"
                libraries={["places"]}
            >
                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="textarea"
                        placeholder="Enter the address of the event"
                        className='form-control border'
                    />
                </Autocomplete>

            </LoadScript>



        </React.Fragment>

    )
}

export default React.memo(MyComponent)