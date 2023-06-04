import React from "react";

function Home(props) {

    return (
        <React.Fragment>
            <div className="container">
                <h4>Hello {props.user.firstName} {props.user.lastName}</h4>
            </div>
        </React.Fragment>
    )
}

export default Home