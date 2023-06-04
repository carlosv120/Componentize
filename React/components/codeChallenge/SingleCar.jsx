import React from "react";


function SingleCar(props) {

    const aCar = props.car

    const onCarClicked = () => {

        props.onCarClicked(aCar);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{aCar.make}</h5>
                <p className="card-text">{aCar.model}</p>
                <p className="card-text">{aCar.year}</p>
                {props.showButton && <button
                    type="button"
                    className="btn btn-primary select-me"
                    id="viewMoreEvent"
                    onClick={onCarClicked}
                >
                    Select Me
                </button>}
            </div>

        </div>
    )
}

export default SingleCar

