import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as friendsServices from "../../services/friendsServices"

import MappingFriend from "./Mapper";


function Friends() {

    const [pageData, setPageData] = useState({ arrayOfFriends: [], friendsComponents: [] });



    useEffect(() => {

        friendsServices.getAll(0, 20).then(onSuccessGetFriends).catch(onErrorGetFriends);

    }, []);

    const onSuccessGetFriends = (data) => {

        var arrayOfFriends = data.item.pagedItems;

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfFriends = arrayOfFriends;
            pageData.friendsComponents = arrayOfFriends.map(mapFriend)

            return pageData;
        })
    }
    const onErrorGetFriends = (response) => {

        console.log(response);
    }



    const mapFriend = (aFriendObject) => {

        return (

            <MappingFriend
                friend={aFriendObject}
                key={"ListB-" + aFriendObject.id}
                onFriendDelete={deleteRequested}
                onFriendEdit={editRequested}>
            </MappingFriend>

        )
    }


    const deleteRequested = (aFriend) => {

        var friendId = aFriend.id //id of the friend to be deleted.

        console.log(friendId);


        //first deletes from the server, and then from the dom only in the success response


        const handler = getDeleteSuccessHandler(friendId);

        friendsServices.deleteFriend(friendId).then(handler).catch(onErrorDeleteFriend)


    }

    const getDeleteSuccessHandler = (idToBeDeleted) => {

        console.log("getDeleteSuccessHandler", idToBeDeleted);

        return () => {

            console.log("onDeleteSuccess", idToBeDeleted);

            setPageData(prevState => {

                var pageData = { ...prevState }; //copying both objects from the state
                pageData.arrayOfFriends = [...pageData.arrayOfFriends];
                //bringing my previous state and setting it up to a new array.



                const indexOfFriend = pageData.arrayOfFriends.findIndex(friend => {

                    var result = false;

                    if (friend.id === idToBeDeleted) {
                        result = true;
                    }
                    return result

                });
                //this uses a function similar to filter, if something is true
                //the function is going to return an index >=0
                //the index of the element to delete within the array


                if (indexOfFriend >= 0) {


                    //start at the index found and delete that element
                    pageData.arrayOfFriends.splice(indexOfFriend, 1);
                    pageData.friendsComponents = pageData.arrayOfFriends.map(mapFriend);

                    //map the function again without the deleted value.
                }


                return pageData; //could be another name.
            })


        }
    }

    const onErrorDeleteFriend = (error) => {

        console.log(error);

    }


    const editRequested = (aFriend) => {

        const targetPageEdit = `/friends/${aFriend.id}`

        //console.log("going to page: ", aFriend.id, aFriend);

        //to pass the info, its required that the object have navigation and location. EDIT: navigation is only required to send.
        //passing as state the object aFriend.
        //THIS IS NOT VERY EFFICIENT BUT WORKS
        navigate(targetPageEdit, { state: aFriend });


    }



    const [show, setShow] = useState(false);

    const toggleShow = () => {

        setShow((prevState) => !prevState);
    }



    const navigate = useNavigate();

    const goToAddFriend = (event) => {

        const targetPage = event.currentTarget.dataset.page;

        navigate(targetPage);
    }

    return (
        <React.Fragment>
            <div className="container text-center">

                <h4 className="text-center m-2" style={{ textTransform: 'capitalize' }}>
                    Friends: {String(show)}
                </h4>

                <div>
                    <button
                        type="submit"
                        className="btn marg btn-primary m-3"
                        id="toggleFriends"
                        onClick={toggleShow}>
                        Toggle Friends
                    </button>
                    <button
                        type="submit"
                        className="btn marg btn-primary m-3"
                        id="addFriend"
                        onClick={goToAddFriend}
                        data-page="/friends/new"
                    >
                        Add Friends
                    </button>
                </div>


                <div className="row justify-content-center">
                    {show && pageData.friendsComponents}
                </div>

            </div>
        </React.Fragment>
    )

}

export default Friends