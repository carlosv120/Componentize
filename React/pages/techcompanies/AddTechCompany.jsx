import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import * as techCompaniesServices from "../../services/techCompaniesServices"

import toastr from "toastr";

function AddTechCompany() {

    const [state, setState] = useState({
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        imageTypeId: "",
        imageUrl: "",
        statusId: "",
        tags: [],
        userId: ""
    });

    const { companyId } = useParams();
    const location = useLocation();

    useEffect(() => {

        if (companyId && location.state.type === "COMPANY_EDIT") {

            setState((previousState) => {

                const newState = { ...previousState };

                newState.id = location.state.payload.id
                newState.name = location.state.payload.name;
                newState.profile = location.state.payload.profile;
                newState.summary = location.state.payload.summary;
                newState.headline = location.state.payload.headline;
                newState.contactInformation = location.state.payload.contactInformation;
                newState.slug = location.state.payload.slug;
                newState.imageTypeId = location.state.payload.primaryImage.typeId
                newState.imageUrl = location.state.payload.primaryImage.url
                newState.statusId = location.state.payload.statusId

                const receivedTags = location.state.payload.tags;
                var tags = [];
                for (let i = 0; i < receivedTags.length; i++) {
                    const currentTag = receivedTags[i].tag;
                    tags.push(currentTag);
                }

                newState.tags = tags.join(", ");
                newState.userId = location.state.payload.userId
                return newState;
            })
        }


    }, [])


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

        const payload = { ...state }

        payload.tags = state.tags.split(", ");

        if (!payload.id) {

            techCompaniesServices.addCompany(payload).then(onSuccessAddCompany).catch(onErrorAddCompany);
            return;
        }

        techCompaniesServices.editCompany(payload).then(onSuccessEditCompany).catch(onErrorEditCompany)
    };


    const onSuccessAddCompany = (data) => {

        var newCompanyId = data.item;

        toastr.success(`Your company has been added: ${newCompanyId}`, "Successful");

        setState((previousState) => {

            const newState = { ...previousState, id: newCompanyId };

            return newState;
        })

    }

    const onErrorAddCompany = (error) => {

        console.log(error);
        toastr.error("Please try again", "Company not added");
    }


    const onSuccessEditCompany = (response) => {

        console.log("success edit", response);
        toastr.warning("Your company has been edited", "Successful");

        setState((prevState) => {

            const newState = { ...prevState }

            return newState;
        })

    }

    const onErrorEditCompany = (error) => {

        console.log(error);
        toastr.error("Your company has not been edited", "Error");

    }



    return (
        <React.Fragment>
            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3" style={{ backgroundColor: 'rgb(239 220 47 / 40%)' }}>
                        <h3 className="text-center margint-15">Add Tech Company</h3>
                        <form>
                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={state.name}
                                    placeholder="Enter the name of the company"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Profile</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="profile"
                                    name="profile"
                                    value={state.profile}
                                    placeholder="Enter the profile of the company"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Summary</h5>
                                <textarea
                                    className="form-control"
                                    id="summary"
                                    name="summary"
                                    rows={3}
                                    value={state.summary}
                                    placeholder="Enter the summary of the company"
                                    onChange={onFormFieldChange}
                                ></textarea>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Headline</h5>
                                <textarea
                                    className="form-control"
                                    id="headline"
                                    name="headline"
                                    rows={2}
                                    value={state.headline}
                                    placeholder="Enter the headline of the company"
                                    onChange={onFormFieldChange}
                                ></textarea>

                            </div>



                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Contact Information</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactInformation"
                                    name="contactInformation"
                                    value={state.contactInformation}
                                    placeholder="Enter the contact Information of the company"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="row marginb-15">

                                <div className="form-group  col-7" >

                                    <h5 style={{ marginBottom: "2px" }}>Slug</h5>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="slug"
                                        name="slug"
                                        value={state.slug}
                                        placeholder="Enter your techCompany's slug"
                                        onChange={onFormFieldChange}
                                    ></input>
                                </div>

                                <div className="form-group col-5" >
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

                                <h5 style={{ marginBottom: '2px' }}>Tags</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    name="tags"
                                    value={state.tags}
                                    placeholder="Example: Tag1, Tag2, Tag3"
                                    onChange={onFormFieldChange}
                                />

                            </div>



                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}
                                >
                                    Add Tech Company
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )
}

export default AddTechCompany