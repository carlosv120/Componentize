import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toastr from "toastr";


import * as friendsServices from "../../services/friendsServices";

import MappingFriend from "./Mapper";


function SearchFriend() {

    const [pageData, setPageData] = useState({ friendsFound: [], friendsComponents: [], query: "" });

    const navigate = useNavigate();

    const onFormFieldChange = (event) => {

        const target = event.target;

        const valueOfTheField = target.value;

        setPageData((prevState) => {

            const newState = { ...prevState };

            prevState.query = valueOfTheField;

            return newState;
        });
    };

    const onFormSubmit = (event) => {

        event.preventDefault();

        friendsServices.searchFriend(0, 10, pageData.query).then(onSearchSuccess).catch(onSearchError)

    }

    const onSearchSuccess = (response) => {

        const arrayFriendsFound = response.data.item.pagedItems

        toastr.success("Your friends are shown now", "Successful");

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.friendsFound = arrayFriendsFound
            pageData.friendsComponents = arrayFriendsFound.map(mapSearchedFriend)

            return pageData;

        })

    }

    const onSearchError = () => {

        toastr.error("No friends found on record", "Error");
    }

    const deleteRequested = (aFriend) => {

        var friendId = aFriend.id //id of the friend to be deleted.

        const handler = getDeleteSuccessHandler(aFriend);

        friendsServices.deleteFriend(friendId).then(handler).catch(onErrorDeleteFriend)


    }

    const getDeleteSuccessHandler = (aFriend) => {

        console.log("getDeleteSuccessHandler", aFriend.id);

        toastr.info("Your friends has been deleted", "Information");

        return () => {

            setPageData(prevState => {
                var pageData = { ...prevState };

                pageData.friendsFound = [...pageData.friendsFound]

                const indexOfFriend = pageData.friendsFound.findIndex(friend => {

                    var result = false;

                    if (friend.id === aFriend.id) {
                        result = true;
                    }
                    return result

                });

                if (indexOfFriend >= 0) {
                    pageData.friendsFound.splice(indexOfFriend, 1);
                    pageData.friendsComponents = pageData.friendsFound.map(mapSearchedFriend);

                }

                return pageData;
            });

        }
    }

    const onErrorDeleteFriend = (error) => {

        console.log(error);

    }


    const editRequested = (aFriend) => {

        const targetPageEdit = `/friends/${aFriend.id}`

        const stateToBeSent = { type: "FRIEND_EDIT", payload: aFriend }

        navigate(targetPageEdit, { state: stateToBeSent });


    }


    const mapSearchedFriend = (aFriendObject) => {

        return (

            <MappingFriend
                friend={aFriendObject}
                key={"ListC-" + aFriendObject.id}
                onFriendDelete={deleteRequested}
                onFriendEdit={editRequested}>
            </MappingFriend>

        )
    }


    return (
        <React.Fragment>

            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col rounded-3" style={{ backgroundColor: 'rgb(131 199 182 / 40%)' }}>

                        <h3 className="text-center margint-15">Find Friend</h3>

                        <form>
                            <div className="row justify-content-center">
                                <div className="form-group marginb-15 col-6 align-self-center" >
                                    <h5 style={{ marginBottom: "2px" }}>Search the Query</h5>
                                    <textarea
                                        className="form-control"
                                        rows={1}
                                        id="query"
                                        name="query"
                                        placeholder="Enter the query"
                                        onChange={onFormFieldChange}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}>
                                    Search Friend
                                </button>

                            </div>
                        </form>

                        <div className="row justify-content-center" style={{ paddingBottom: "20px" }}>
                            {pageData.friendsComponents}
                        </div>
                    </div>
                </div>
            </div>



        </React.Fragment>
    )
}

export default SearchFriend