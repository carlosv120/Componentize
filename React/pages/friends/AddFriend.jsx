import React from "react";
import { useState } from "react";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import toastr from "toastr";

import * as friendsServices from "../../services/friendsServices";



function AddFriend() {

    const [state, setState] = useState({
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        imageTypeId: "",
        imageUrl: "",
        skills: []
    });

    const { friendId } = useParams();

    const location = useLocation();


    const onFormFieldChange = (event) => {

        const target = event.target;

        const valueOfTheField = target.value;

        const nameOfTheFormField = target.name;

        setState((prevState) => {

            const newState = { ...prevState };

            newState[nameOfTheFormField] = valueOfTheField;

            return newState;
        });
    };

    const onFormSubmit = (event) => {

        event.preventDefault();

        const payload = { ...state };

        payload.skills = state.skills.split(", ");


        if (!payload.id) {

            friendsServices.addFriend(payload).then(onSuccessAddFriend).catch(onErrorAddFriend);

            return;
        }

        friendsServices.editFriend(payload).then(onSuccessEditFriend).catch(onErrorEditFriend);

    }

    const onSuccessEditFriend = (response) => {

        console.log("success edit", response);
        toastr.warning("Your friend has been edited", "Successful");

        setState((prevState) => {

            const newState = { ...prevState }

            return newState;
        })

        // document.getElementsByTagName("form")[0].reset();
        // clearForm();
    }

    const onErrorEditFriend = (error) => {

        console.log(error);

    }


    //     const clearForm = () => {
    // 
    //         setState((prevState) => {
    // 
    //             const newState = { ...prevState };
    // 
    //             newState.title = " ";
    //             newState.bio = " ";
    //             newState.summary = " ";
    //             newState.headline = " ";
    //             newState.slug = " ";
    //             newState.primaryImage = {};
    //             newState.skills = [];
    // 
    //             return newState;
    // 
    //         })
    //     }



    const onSuccessAddFriend = (data) => {

        var newFriendId = data.item;

        toastr.success(`Your friend has been added Id: ${newFriendId}`, "Successful");

        setState((prevState) => {

            const newState = { ...prevState, id: newFriendId }

            return newState;
        })

        // document.getElementsByTagName("form")[0].reset();
        // clearForm();
    }

    const onErrorAddFriend = (error) => {

        console.log(error);
        toastr.error("Please try again", "Friend not added");

        // document.getElementsByTagName("form")[0].reset();
        // clearForm();
    }




    useEffect(() => {

        if (friendId && location.state.type === "FRIEND_EDIT") {

            setState((previousState) => {

                const newState = { ...previousState };

                newState.id = location.state.payload.id;
                newState.title = location.state.payload.title;
                newState.bio = location.state.payload.bio;
                newState.summary = location.state.payload.summary;
                newState.headline = location.state.payload.headline;
                newState.slug = location.state.payload.slug;
                newState.statusId = location.state.payload.statusId;
                newState.imageTypeId = location.state.payload.primaryImage.typeId;
                newState.imageUrl = location.state.payload.primaryImage.url;

                const receivedSkills = location.state.payload.skills;

                var skills = [];
                for (let i = 0; i < receivedSkills.length; i++) {
                    const currentSkillName = receivedSkills[i].name;
                    skills.push(currentSkillName);
                }

                newState.skills = skills.join(", ");

                return newState;
            })

        }
    }, []);



    return (
        <React.Fragment>

            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3" style={{ backgroundColor: 'rgb(131 199 182 / 40%)' }}>
                        <h3 className="text-center margint-15">Add Friend</h3>
                        <form>
                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Title</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={state.title}
                                    placeholder="Enter your friend's title"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Biography</h5>
                                <textarea
                                    className="form-control"
                                    id="bio"
                                    name="bio"
                                    rows={2}
                                    value={state.bio}
                                    placeholder="Enter your friend's bio"
                                    onChange={onFormFieldChange}
                                ></textarea>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Summary</h5>
                                <textarea
                                    className="form-control"
                                    id="summary"
                                    name="summary"
                                    rows={3}
                                    value={state.summary}
                                    placeholder="Enter your friend's summary"
                                    onChange={onFormFieldChange}
                                ></textarea>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Headline</h5>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="headline"
                                    name="headline"
                                    value={state.headline}
                                    placeholder="Enter your friend's headline"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="row marginb-15">

                                <div className="form-group  col-6" >

                                    <h5 style={{ marginBottom: "2px" }}>Slug</h5>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="slug"
                                        name="slug"
                                        value={state.slug}
                                        placeholder="Enter your friend's slug"
                                        onChange={onFormFieldChange}
                                    ></input>
                                </div>

                                <div className="form-group col-6" >
                                    <h5 style={{ marginBottom: "2px" }}>Status Id</h5>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="statusId"
                                        name="statusId"
                                        value={state.statusId}
                                        onChange={onFormFieldChange}>
                                        <option value={"none"}>Select Status Id</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </select>
                                </div>
                                <small
                                    className="form-text">
                                    The slug is the unique identifying part of a web address, typically at the end of the URL.
                                </small>

                            </div>

                            <div className="row">
                                <div className="form-group col-3" >

                                    <h5 style={{ marginBottom: "2px" }}>Image Type Id</h5>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="imageTypeId"
                                        name="imageTypeId"
                                        value={state.imageTypeId}
                                        onChange={onFormFieldChange}>
                                        <option value={"none"}>Type Id</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <div className="form-group col-9" style={{ marginBottom: '15px' }}>

                                    <h5 style={{ marginBottom: '2px' }}>Profile URL</h5>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={state.imageUrl}
                                        placeholder="Example: https://image.jpeg"
                                        onChange={onFormFieldChange}
                                    />
                                </div>
                            </div>


                            <div className="form-group" style={{ marginBottom: '15px' }}>

                                <h5 style={{ marginBottom: '2px' }}>Skills</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="skills"
                                    name="skills"
                                    value={state.skills}
                                    placeholder="Example: Skill1, Skill2, Skill3"
                                    onChange={onFormFieldChange}
                                />

                            </div>

                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}>
                                    Add Friend
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </React.Fragment>
    )
}

export default AddFriend;