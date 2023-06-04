import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

import * as userServices from "../services/userServices";

import toastr from "toastr";

import { useNavigate } from "react-router-dom";

function SiteNav(props) {


    const [showLogin, setShowLogin] = useState(true);

    const [showLogout, setHowLogout] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        if (props.user.isLoggedIn === true) {

            setShowLogin((prevState) => !prevState);

            setHowLogout((prevState) => !prevState);
        }

    }, [props.user.isLoggedIn])


    const logoutFunction = () => {

        userServices.logout().then(onLogoutSuccess).catch(onLogoutError);
    }

    const onLogoutSuccess = () => {

        props.setStateFunction(() => {

            const newState = {};

            newState.firstName = "Unknown";
            newState.lastName = "User";
            newState.email = " ";
            newState.avatar = " ";
            newState.isLoggedIn = false;

            return newState;
        });

        setShowLogin((prevState) => !prevState);

        setHowLogout((prevState) => !prevState);

        toastr.info("You are logged out now!", "Successful");

        navigate("/");
    }

    const onLogoutError = (error) => {
        console.log(error)

    }


    return (
        <React.Fragment>
            <nav
                className="navbar navbar-expand-md navbar-dark bg-dark"
                aria-label="Fourth navbar example"
            >
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="https://pw.sabio.la/images/Sabio.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Sabio"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample04"
                        aria-controls="navbarsExample04"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">

                                <Link
                                    to="/"
                                    className="nav-link px-2 text-white link-button">
                                    Home
                                </Link>

                            </li>
                            <li className="nav-item">

                                <Link
                                    to="/friends"
                                    className="nav-link px-2 text-white link-button">
                                    Friends
                                </Link>

                            </li>
                            {/* <li className="nav-item">

                                <Link
                                    to="/friendslist"
                                    className="nav-link px-2 text-white link-button">
                                    Friends List
                                </Link>

                            </li>
                            <li className="nav-item">

                                <Link
                                    to="/friendsteams"
                                    className="nav-link px-2 text-white link-button">
                                    Friends Teams
                                </Link>

                            </li> */}
                            <li className="nav-item">
                                <Link
                                    to="/jobs"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Jobs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/companies"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Tech Companies
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/events"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/test"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Test and Ajax Call
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/politicalcandidates"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Political Candidates
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/cars"
                                    className="nav-link px-2 text-white link-button"
                                >
                                    Cars
                                </Link>
                            </li>
                        </ul>
                        <div className="text-end">
                            <Link
                                to="/"
                                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
                            >
                                {props.user.firstName} {props.user.lastName}
                            </Link>

                            {showLogin && <Link
                                to="/login"
                                type="button"
                                className="btn btn-outline-light me-2">
                                Login
                            </Link>}

                            {showLogout && <Link
                                to="/"
                                type="button"
                                className="btn btn-outline-light me-2"
                                onClick={logoutFunction}>
                                Logout
                            </Link>}

                            <Link
                                to="/register"
                                type="button"
                                className="btn btn-warning">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default SiteNav