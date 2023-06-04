import React from "react";

function PetsCard(props) {

    const aPet = props.pets

    return (
        <div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }}>
            <div className="card-body text-center m-2">
                <h5 className="card-name" >{aPet.name}</h5>
                <p className="card-type">{aPet.type}</p>
                <p className="card-age">{aPet.age}</p>
            </div>
        </div>


    )
}

export default PetsCard