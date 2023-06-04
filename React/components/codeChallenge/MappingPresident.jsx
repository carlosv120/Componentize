
import React from "react";



function MappingPresident(props) {

    const aPresident = props.president;

    console.log(aPresident);

    return (
        <React.Fragment>
            <div className="card  p-3 m-2 shadow rounded" style={{ width: '14rem', paddingTop: '10px' }}>
                <div className="card-body text-center mt-2">
                    <h5 className="card-title" style={{ textTransform: 'capitalize' }}>{aPresident.nm}</h5>
                    <p className="card-id">{aPresident.pp}</p>
                    <p className="card-dob">{aPresident.tm}</p>
                </div>
            </div>

        </React.Fragment>


    )
}

export default MappingPresident;