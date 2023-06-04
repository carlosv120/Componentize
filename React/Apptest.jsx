import React from "react";
import "./App.css";
import { useState } from "react";

import { Routes } from "react-router-dom"
import { Route } from "react-router-dom";


import SiteNav from "./pages/SiteNav";

import Home from "./pages/Home"
import Friends from "./pages/friends/Friends"
import AddFriend from "./pages/friends/AddFriend";
import Jobs from "./pages/jobs/Jobs"
import TechCompanies from "./pages/techcompanies/TechCompanies"
import Events from "./pages/events/Events"
import Test from "./pages/TestAndAjax"
import Footer from "./pages/Footer";
import LogIn from "./pages/user/LogIn"
import Register from "./pages/user/Register"

import PoliticalCandidates from "./components/codeChallenge/PoliticalCandidates";

// import FriendsList from "./pages/friends/FriendsList";
// import FriendsTeams from "./pages/friends/FriendsTeams";


function App() {

    const [state] = useState(
        {
            firstName: "Carlos",
            isLoggedIn: false,
            lastName: "Vanegas"
        })


    return (
        <React.Fragment>

            <SiteNav user={state}></SiteNav>

            <Routes>
                <Route path="/" element={<Home user={state} />}></Route>

                <Route path="/friends" element={<Friends />}></Route>
                <Route path="/friends/new" element={<AddFriend />}></Route>
                <Route path="/friends/:friendId" element={<AddFriend />} ></Route>

                <Route path="/jobs" element={<Jobs />}></Route>
                <Route path="/companies" element={<TechCompanies />}></Route>
                <Route path="/events" element={<Events />}></Route>
                <Route path="/test" element={<Test />}></Route>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/register" element={<Register />}></Route>

                <Route path="/politicalcandidates" element={<PoliticalCandidates />}></Route>

                {/* <Route path="/friendslist" element={<FriendsList />}></Route>
                <Route path="/friendsteams" element={<FriendsTeams />}></Route> */}
            </Routes>

            <Footer></Footer>

        </React.Fragment>
    );
}

export default App;
