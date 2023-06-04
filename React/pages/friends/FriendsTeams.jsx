import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import * as friendsServices from "../../services/friendsServices"

function FriendsTeams() {

    //const [arrayOfFriends, setArrayOfFriends] = useState([]);

    const [pageData, setPageData] = useState({ arrayOfFriends: [], friendComponents: [] });
    //page data is where my array of friends is going to be.


    //whenever this state changes or is updated, react goes to the render the entire pag all along
    //We dont want to render everything everytime.
    const [count, setCount] = useState(1);


    //I want to use an effect after the component is initiallized
    //I only want to use it once
    //I am going to feed it one function
    //my second argument its going to be an empty array
    //its not going to do anything, its going to fire only one time after
    //friends is fired.
    useEffect(() => {
        //console.log("firing use effect")
        friendsServices.getAll(0, 5).then(onSuccessGetFriends).catch(onErrorGetFriends);

    }, []);

    const onSuccessGetFriends = (data) => {

        //service helper is a global handler that does (data = response.data)
        var arrayOfFriends = data.item.pagedItems; //array of friends


        //it was setArrayOfFriends
        setPageData((previousState) => {

            //empty state
            const pageData = { ...previousState };

            //getting the array from the ajax call to the new state.
            //changing the content as soon as I know what my array of data is, nowhere else.
            pageData.arrayOfFriends = arrayOfFriends;
            pageData.friendComponents = arrayOfFriends.map(mapFriend)

            //the prevState, arrayOfFriends is empty
            return pageData;
        })
    }
    const onErrorGetFriends = (response) => {

        console.log(response);
    }

    const mapFriend = (aFriendObject) => {
        //console.log("mapping", aFriendObject);
        return (

            <div className="card col-md-4 p-3 mb-2" style={{ width: '18rem', paddingTop: '10px' }} key={"ListB-" + aFriendObject.id}>
                <img className="card-img-top picture" src={aFriendObject.primaryImage.imageUrl} alt="ALT TEMPLATE" />
                <div className="card-body text-center mt-2">
                    <h3 className="card-title" style={{ textTransform: 'capitalize' }}>{aFriendObject.title}</h3>
                    <h4 className="card-id">{aFriendObject.bio}</h4>
                    <h5 className="card-dob">{aFriendObject.summary}</h5>
                </div>
            </div>

        )
    }

    const onHeaderClick = () => {

        console.log("onHeaderClick");
        setCount((prevCount) => {

            return prevCount + 1;
        })
    }

    return (
        <React.Fragment>
            <div className="container">
                <h4 className="text-center">Friends</h4>

                <h3
                    className="text-center"
                    onClick={onHeaderClick}>
                    Rendering: {count}
                </h3>

                <div className="row justify-content-center">
                    {/* no need to map it in the return function, mapping happens on success */}
                    {/* React goes through the code, and then finds the array friendsComponents, finds the array and its the same thing, so it surpasses it. */}
                    {pageData.friendComponents}
                </div>


            </div>
        </React.Fragment>
    )
}

export default FriendsTeams