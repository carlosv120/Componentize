import React from "react";
import { useState } from "react";
import toastr from "toastr";

import * as userServices from "../../services/userServices";

function Register() {


    //could be const[user,setUser]
    //could be const [form, setForm]

    const [state, setState] = useState({
        email: " ",
        firstName: " ",
        lastName: " ",
        password: " ",
        passwordConfirm: " ",
        avatarUrl: " ",
        tenantId: "U04U5JF3Z9Q"
    });


    const onFormFieldChange = (event) => {

        //console.log("onChange", event);
        //capture info you need from event here as the event object will fall out of scope quickly


        //the event.target will represent the input, the field of the form that is changing.
        const target = event.target;
        //console.log("target", target)


        //this is the value of the input, the value in the text box the user types into.
        const valueOfTheField = target.value;
        // console.log("value", valueOfTheField)



        //this is the name (so be sure to give your form fields a name attribute), either name, password, etc.
        const nameOfTheFormField = target.name;
        //console.log("name", nameOfTheFormField)



        //set the new state using the old property name / object key and using the new value for formData

        setState((prevState) => {

            //console.log("updater onChange");
            // copy the personData object from state using the spread operator

            const newState = {
                ...prevState,
            };

            //change the value of the copied object using the name and using bracket notation
            //Example NewState newState[email] = inputemail@something.com
            //new syntaxis newState[propertyOfTheState] = newValue.

            newState[nameOfTheFormField] = valueOfTheField;

            //in functional components the name of this object/variable does not matter, it still returns the new state.
            return newState;
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        userServices.register(state).then(onSuccessRegister).catch(onErrorRegister);

    }

    const clearForm = () => {

        setState((prevState) => {

            const newState = { ...prevState };

            newState.email = " ";
            newState.firstName = " ";
            newState.lastName = " ";
            newState.password = " ";
            newState.passwordConfirm = " ";
            newState.avatarUrl = " ";

            return newState;

        })
    }

    const onSuccessRegister = (response) => {

        console.log("registered", response);
        toastr.success("You are registered now!", "Successful Registration");

        document.getElementsByTagName("form")[0].reset();
        clearForm();
    }

    const onErrorRegister = (error) => {

        console.log(error);
        toastr.error("Please try again", "Registration Failed");

        document.getElementsByTagName("form")[0].reset();
        clearForm();
    }


    return (
        <React.Fragment>

            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3" style={{ backgroundColor: 'rgb(151 200 205)' }}>
                        {/* use always className rounded-3 is purely bootstrap and is defined as a class */}
                        {/*style is transformed from html to jsx, including the {{}} and the class name.*/}

                        <h3 className="text-center margint-15">Register</h3>
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
                                    onChange={onFormFieldChange}
                                ></input>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>First Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    onChange={onFormFieldChange}
                                ></input>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Last Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    onChange={onFormFieldChange}
                                ></input>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Password</h5>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={onFormFieldChange}
                                ></input>
                                <small
                                    className="form-text text-primary">
                                    Please include one special character !"#$%&'()*+,-./:;=?
                                </small>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Confirm Password</h5>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    placeholder="Re-Enter your password"
                                    onChange={onFormFieldChange}
                                ></input>

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>

                                <h5 style={{ marginBottom: '2px' }}>Profile URL</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="avatarUrl"
                                    name="avatarUrl"
                                    placeholder="Example: https://image.jpeg"
                                    onChange={onFormFieldChange}
                                />

                            </div>

                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}>
                                    Register
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register