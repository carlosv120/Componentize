import React from "react";
import debug from 'sabio-debug'

import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import * as techCompaniesServices from "../../services/techCompaniesServices"
import * as jobsServices from "../../services/jobsServices"

import toastr from "toastr";


function AddJob() {

    const [state, setState] = useState({
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        techCompanyId: "",
        statusId: "",
        skills: [],
        userId: ""
    })
    const [companyOptions, setCompanyOptions] = useState([]);

    const { jobId } = useParams();
    const location = useLocation();
    const _logger = debug.extend("AddJob");


    useEffect(() => {

        techCompaniesServices.getCompanies(0, 100).then(onGetCompaniesSuccess).catch(onGetCompaniesError)
        //technically not required, just to update the selectors

        _logger("TESTING");
        console.log("testing");
        if (jobId && location.state.type === "JOB_EDIT") {

            setState((previousState) => {

                const newState = { ...previousState };

                newState.id = location.state.payload.id
                newState.title = location.state.payload.title;
                newState.description = location.state.payload.description;
                newState.summary = location.state.payload.summary;
                newState.pay = location.state.payload.pay;
                newState.slug = location.state.payload.slug;
                newState.techCompanyId = location.state.payload.techCompany.id;
                newState.statusId = location.state.payload.statusId;

                const receivedSkills = location.state.payload.skills;
                var skills = [];
                for (let i = 0; i < receivedSkills.length; i++) {
                    const currentTag = receivedSkills[i].skill;
                    skills.push(currentTag);
                }

                newState.skills = skills.join(", ");
                newState.userId = location.state.payload.userId;

                return newState;
            })

        }


    }, [])

    const onGetCompaniesSuccess = (data) => {

        const techCompaniesArray = data.item.pagedItems

        const mappedArray = techCompaniesArray.map(mappingOptions)
        setCompanyOptions(mappedArray);

    }

    const mappingOptions = (aCompanyObject) => {

        return (<option key={aCompanyObject.id} value={aCompanyObject.id}>{aCompanyObject.name}</option>)
    }

    const onGetCompaniesError = (error) => {

        console.log(error);
    }


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

        _logger(payload);

        if (!payload.id) {

            jobsServices.addJob(payload).then(onSuccessAddJob).catch(onErrorAddJob);

        }

        jobsServices.editJob(payload).then(onSuccessEditJob).catch(onErrorEditJob)

    }


    const onSuccessAddJob = (data) => {

        var newJobId = data.item;

        toastr.success(`Your job has been added: ${newJobId}`, "Successful");

        setState((previousState) => {

            const newState = { ...previousState, id: newJobId };

            return newState;
        })

    }

    const onErrorAddJob = () => {

        toastr.error("Please try again", "Job not added");
    }

    const onSuccessEditJob = (response) => {

        _logger("success edit", response);
        toastr.warning("Your job has been edited", "Successful");

        setState((prevState) => {

            const newState = { ...prevState }

            return newState;
        })

    }

    const onErrorEditJob = (error) => {

        console.log(error);

    }


    return (
        <React.Fragment>

            <div className="container margint-15">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3" style={{ backgroundColor: 'rgb(47 177 239 / 40%)' }}>
                        <h3 className="text-center margint-15">Add Job</h3>
                        <form>
                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Title</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={state.title}
                                    placeholder="Enter the job's title"
                                    onChange={onFormFieldChange}
                                ></input>
                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Description</h5>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows={2}
                                    value={state.description}
                                    placeholder="Enter the job's description"
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
                                    placeholder="Enter the job's summary"
                                    onChange={onFormFieldChange}
                                ></textarea>

                            </div>

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Salary</h5>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="pay"
                                    name="pay"
                                    value={state.pay}
                                    placeholder="Enter the job's salary"
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

                            <div className="form-group marginb-15" >

                                <h5 style={{ marginBottom: "2px" }}>Tech Company</h5>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    id="techCompanyId"
                                    name="techCompanyId"
                                    value={state.techCompanyId}
                                    onChange={onFormFieldChange}>
                                    <option value={"none"}>Open this select menu</option>
                                    {companyOptions};

                                </select>
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>

                                <h5 style={{ marginBottom: '2px' }}>Skills</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="skills"
                                    name="skills"
                                    value={state.skills}
                                    placeholder="Enter the skills for the job"
                                    onChange={onFormFieldChange}
                                />
                                <small
                                    className="form-text" style={{ color: "rgb(80 80 80)" }}>
                                    Enter the skills separated by a comma.
                                </small>

                            </div>

                            <div className="form-group text-center marginb-15">

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="submitButton"
                                    onClick={onFormSubmit}
                                >
                                    Add Job
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </React.Fragment>
    )
}

export default AddJob