import React from "react";
import "./App.css";

import { useState } from "react";
import { useEffect } from "react";

import * as userServices from "./services/userServices";

import { Routes } from "react-router-dom"
import { Route } from "react-router-dom";


import SiteNav from "./pages/SiteNav";

import Home from "./pages/Home"

import Friends from "./pages/friends/Friends"
import AddFriend from "./pages/friends/AddFriend";
import SearchFriend from "./pages/friends/SearchFriend"

import Jobs from "./pages/jobs/Jobs"
import AddJob from "./pages/jobs/AddJob"

import TechCompanies from "./pages/techcompanies/TechCompanies"
import AddTechCompany from "./pages/techcompanies/AddTechCompany";

import Events from "./pages/events/Events"
import Test from "./pages/TestAndAjax"
import Footer from "./pages/Footer";
import LogIn from "./pages/user/LogIn"
import Register from "./pages/user/Register"


import PoliticalCandidates from "./components/codeChallenge/PoliticalCandidates";

import Cars from "./components/codeChallenge/Cars"

import PetsList from "./components/codeChallenge/PetsList";


import Basic from "./components/codeChallenge/basic";


function App() {


    const [state, setState] = useState(
        {
            firstName: "Unknown",
            lastName: "User",
            email: " ",
            avatar: " ",
            isLoggedIn: false
        }
    );

    useEffect(() => {

        userServices.currentUser().then(onSuccessCurrent).catch(onErrorCurrent);

    }, []);

    const onSuccessCurrent = (response) => {
        const currentUserId = response.data.item.id;

        userServices.getById(currentUserId).then(onSuccessGetById).catch(onErrorGetById);
    }

    const onErrorCurrent = () => {
        console.log("No Current User")
    }

    const onSuccessGetById = (response) => {

        const CurrentUserInfo = response.data.item

        setState(() => {
            ///props setState can update the app state on success CurrentUserInfo
            const newState = {};

            newState.firstName = CurrentUserInfo.firstName;
            newState.lastName = CurrentUserInfo.lastName;
            newState.email = CurrentUserInfo.email;
            newState.avatar = CurrentUserInfo.avatarUrl;
            newState.isLoggedIn = true;

            return newState;
        });

    }

    const onErrorGetById = () => {

        console.log("ErrorGetById");
    }



    return (
        <React.Fragment>

            <SiteNav user={state} setStateFunction={setState} ></SiteNav>

            <Routes>
                <Route path="/" element={<Home user={state} />}></Route>

                <Route path="/friends" element={<Friends />}></Route>
                <Route path="/friends/new" element={<AddFriend />}></Route>
                <Route path="/friends/:friendId" element={<AddFriend />} ></Route>
                <Route path="/friends/search" element={<SearchFriend />} ></Route>

                <Route path="/jobs" element={<Jobs />}></Route>
                <Route path="/jobs/new" element={<AddJob />}></Route>
                <Route path="/jobs/:jobId" element={<AddJob />} ></Route>

                <Route path="/companies" element={<TechCompanies />}></Route>
                <Route path="/companies/new" element={<AddTechCompany />}></Route>
                <Route path="/companies/:companyId" element={<AddTechCompany />}></Route>

                <Route path="/events" element={<Events />}></Route>
                <Route path="/test" element={<Test />}></Route>
                <Route path="/login" element={<LogIn setStateFunction={setState} />}></Route>
                {/* pass setState as props to login, you can pass functions as well */}
                <Route path="/register" element={<Register />}></Route>

                <Route path="/politicalcandidates" element={<PoliticalCandidates />}></Route>

                <Route path="/cars" element={<Cars />}></Route>

                <Route path="/petslist" element={<PetsList />}></Route>

                <Route path="/basic" element={<Basic />}  ></Route>

            </Routes>

            <Footer></Footer>

        </React.Fragment>
    );
}

export default App;
