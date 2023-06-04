import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toastr from "toastr";

import * as userServices from "../../services/userServices";

function LogIn(props) {

    const navigate = useNavigate();

    const [state, setState] = useState({
        // email: "carlosv.12044@gmail.com",
        // password: "Carlitos1*",
        // tenantId: "U04U5JF3Z9Q"

        email: "",
        password: "",
        tenantId: ""

    });



    const onFormFieldChange = (event) => {

        const target = event.target;

        const nameOfTheFormField = target.name;
        const valueOfTheField = target.value;

        setState((prevState) => {

            const newState = { ...prevState };

            newState[nameOfTheFormField] = valueOfTheField;

            return newState;
        })

    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        userServices.logIn(state).then(onSuccessLogIn).catch(onErrorLogIn);

    }

    const clearForm = () => {

        setState((prevState) => {

            const newState = { ...prevState };

            newState.email = " ";
            newState.password = " ";

            return newState;

        })
    }

    const onSuccessLogIn = (response) => {

        console.log("logged in", response);
        toastr.success("You are logged in now!", "Successful");

        userServices.currentUser().then(onSuccessCurrent).catch(onErrorCurrent);

        document.getElementsByTagName("form")[0].reset();
        clearForm();

    }

    const onErrorLogIn = (error) => {

        console.log(error);
        toastr.error("Please try again", "Log In Failed");

        document.getElementsByTagName("form")[0].reset();
        clearForm();
    }

    const onSuccessCurrent = (response) => {
        const currentUserId = response.data.item.id;

        userServices.getById(currentUserId).then(onSuccessGetById).catch(onErrorGetById);
    }

    const onErrorCurrent = (error) => {
        console.log("error current user", error)
    }

    const onSuccessGetById = (response) => {

        const CurrentUserInfo = response.data.item


        props.setStateFunction(() => {
            ///props setState can update the app state on success CurrentUserInfo
            const newState = {};

            newState.firstName = CurrentUserInfo.firstName;
            newState.lastName = CurrentUserInfo.lastName;
            newState.email = CurrentUserInfo.email;
            newState.avatar = CurrentUserInfo.avatarUrl;
            newState.isLoggedIn = true;

            return newState;
        });

        navigate("/");
    }

    const onErrorGetById = (error) => {

        console.log(error);
    }

    return (
        <React.Fragment>
            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col-md-6 backgroundcolor rounded-3">
                        {/* rounded-3 is purely bootstrap and is defined as a class */}
                        {/* backgrouncolor is a class defined with css */}

                        <h3 className="text-center margint-15">Log In</h3>
                        <form>

                            <div className="form-group marginb-15" >
                                {/* the class marginb-15 is purely defined as a css */}

                                <h5 style={{ marginBottom: "2px" }}>Email Address</h5>
                                {/* the curly brackets are defined under react rules following the bootstrap equivalent*/}

                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    onChange={onFormFieldChange}>
                                </input>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Password</h5>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={onFormFieldChange}>
                                </input>

                            </div>

                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}>
                                    Log In
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LogIn