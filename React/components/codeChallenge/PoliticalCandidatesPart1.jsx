
import React from "react";
import { useState } from "react";
import toastr from "toastr";

import * as politicalCandidateService from "./services/politicalCandidateService"

import PoliticalCandidateCard from "./PoliticalCandidateCard";



function PoliticalCandidates() {

    const [pageDataLeft, setPageDataLeft] = useState({ arrayOfPresidents1: [], presidentsComponents1: [] });

    const [form1, setForm1] = useState({
        firstName: "",
        lastName: "",
        currentVotes: "",
        party: "",
        imageUrl: ""
    })
    const [showForm1, setShowForm1] = useState(true);





    const [pageDataRight, setPageDataRight] = useState({ arrayOfPresidents2: [], presidentsComponents2: [] });

    const [form2, setForm2] = useState({
        firstName2: "",
        lastName2: "",
        currentVotes2: "",
        party2: "",
        imageUrl2: ""
    })

    const [showForm2, setShowForm2] = useState(true);

    const onFormFieldChange1 = (event) => {

        const target = event.target;

        const nameOfTheFormField = target.name;
        const valueOfTheField = target.value;

        setForm1((prevState) => {

            const newState = { ...prevState };

            newState[nameOfTheFormField] = valueOfTheField;

            return newState;
        })

    };

    const onFormFieldChange2 = (event) => {


        const target = event.target;

        const nameOfTheFormField = target.name;
        const valueOfTheField = target.value;

        setForm2((prevState) => {

            const newState = { ...prevState };

            newState[nameOfTheFormField] = valueOfTheField;

            return newState;
        })

    };


    const onFormValidation = (event) => {
        event.preventDefault();

        var buttonId = event.target.id;

        if (buttonId === "submit1") {

            if (form1.firstName.length === 0) {
                toastr.error("First Name not valid", "Error");
                return
            }
            else if (form1.lastName.length === 0) {
                toastr.error("Last Name not valid", "Error");
                return
            }
            if (isNaN(Number(form1.currentVotes))) {
                toastr.error("Votes are not valid", "Error");
                return
            }
            else if (form1.party.length === 0) {
                toastr.error("Select Party", "Error");
                return
            }
            else if (form1.imageUrl.length === 0) {
                toastr.error("Image not valid", "Error");
                return
            } else {

                toastr.info("Valid Form", "Success");
                politicalCandidateService.add(form1).then(onAddSuccess).catch(onAddError)

            }

        }


        if (buttonId === "submit2") {
            if (form2.firstName2.length === 0) {
                toastr.error("First Name not valid", "Error");
                return
            }
            else if (form2.lastName2.length === 0) {
                toastr.error("Last Name not valid", "Error");
                return
            }
            else if (isNaN(Number(form2.currentVotes2))) {
                toastr.error("Votes are not valid", "Error");
                return
            }
            else if (form2.party2.length === 0) {
                toastr.error("Select Party", "Error");
                return
            }
            else if (form2.imageUrl2.length === 0) {
                toastr.error("Image not valid", "Error");
                return
            } else {

                toastr.info("Valid Form", "Success");
                politicalCandidateService.add(form2).then(onAddSuccess).catch(onAddError)

            }


        }


    };

    const onAddSuccess = (response) => {

        if (response.firstName) {

            console.log("left form activated", response) //this is an object

            setPageDataLeft((previousState) => {

                const newState = { ...previousState };

                newState.arrayOfPresidents1 = response;
                newState.presidentsComponents1 = mapCandidate(newState.arrayOfPresidents1);

                return newState
            })

        } else {

            console.log("right form activated")

            setPageDataRight((previousState) => {

                const newState = { ...previousState };

                newState.arrayOfPresidents2 = response;
                newState.presidentsComponents2 = mapCandidate(newState.arrayOfPresidents2);

                return newState
            })
        }

        toastr.success("Entity Added", "Success");

    };

    const onAddError = (error) => {

        false && console.log(error);

        toastr.error("Entity not Added", "Error");

    };

    const mapCandidate = (aCandidate) => {

        console.log("entering to mapping");


        return (
            <PoliticalCandidateCard
                candidate={aCandidate}
                key={"list-" + aCandidate.id}>
            </PoliticalCandidateCard>
        )
    }


    const onFormReset = (event) => {
        event.preventDefault();

        var buttonId = event.target.id;

        if (buttonId === "reset") {

            console.log("on form reset1", buttonId)

            setShowForm1(() => !showForm1);

            setForm1((previousState) => {

                const emptyState = {
                    ...previousState, firstName: "",
                    lastName: "",
                    currentVotes: "",
                    party: "",
                    imageUrl: ""
                };
                return emptyState;
            })


        } else {

            console.log("on form reset2", buttonId)

            setShowForm2(() => !showForm2);

            setForm2((previousState) => {

                const emptyState = {
                    ...previousState, firstName2: "",
                    lastName2: "",
                    currentVotes2: "",
                    party2: "",
                    imageUrl2: ""
                };
                return emptyState;
            })
        }


    }


    const addWinner = () => {

        const votesForm1 = form1.currentVotes;

        const votesForm2 = form2.currentVotes2;

        console.log(votesForm1, votesForm2);

        if (votesForm1 > votesForm2) {
            console.log("form1 winning")

            setForm1((previousState) => {

                const newState = { ...previousState, winner: "winner" }

                return newState
            })

            document.getElementsByClassName('card')[0].style.border = "green 10px solid"

            setShowForm2(() => !showForm2)


        } else if (votesForm1 < votesForm2) {
            console.log("form2 winning")

            setForm2((previousState) => {

                const newState = { ...previousState, winner: "winner" }

                return newState
            })

            document.getElementsByClassName('card')[0].style.border = "green 10px solid"
            setShowForm1(() => !showForm1)

        } else {
            console.log("no winner");
        }

    }

    return (
        <React.Fragment>
            <div className="container" style={{ backgroundColor: 'rgb(115 159 197)' }}>
                <div className="row justify-content-center">
                    <div className="col-5 m-2">
                        <form>
                            <h1 className="text-center">Form 1</h1>
                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>First Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter the First Name"
                                    value={form1.firstName}
                                    onChange={onFormFieldChange1}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Last Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter the Last Name"
                                    value={form1.lastName}
                                    onChange={onFormFieldChange1}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Current Votes</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="currentVotes"
                                    name="currentVotes"
                                    placeholder="Enter the currentVotes"
                                    value={form1.currentVotes}
                                    onChange={onFormFieldChange1}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Select Party</h5>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    id="party"
                                    name="party"
                                    value={form1.party}
                                    onChange={onFormFieldChange1}
                                >
                                    <option value="">Select</option>
                                    <option value="democrat">Democrat</option>
                                    <option value="republican">Republican</option>
                                    <option value="independent">Independent</option>
                                </select>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Image URL</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageUrl"
                                    name="imageUrl"
                                    placeholder="Enter the imageURL"
                                    value={form1.imageUrl}
                                    onChange={onFormFieldChange1}>
                                </input>
                            </div>


                            <div className="form-group text-center marginb-15">
                                <button
                                    type="submit"
                                    className="btn marg btn-primary m-3"
                                    id="submit1"
                                    onClick={onFormValidation}
                                >
                                    Submit
                                </button>

                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="reset"
                                    onClick={onFormReset}
                                >
                                    Reset
                                </button>

                            </div>

                        </form>

                    </div>
                    <div className="col-5 m-2">
                        <form>
                            <h1 className="text-center">Form 2</h1>
                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>First Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName2"
                                    name="firstName2"
                                    placeholder="Enter the First Name"
                                    value={form2.firstName2}
                                    onChange={onFormFieldChange2}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Last Name</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName2"
                                    name="lastName2"
                                    placeholder="Enter the Last Name"
                                    value={form2.lastName2}
                                    onChange={onFormFieldChange2}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Current Votes</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="currentVotes2"
                                    name="currentVotes2"
                                    placeholder="Enter the currentVotes"
                                    value={form2.currentVotes2}
                                    onChange={onFormFieldChange2}>
                                </input>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Select Party</h5>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    id="party2"
                                    name="party2"
                                    value={form2.party2}
                                    onChange={onFormFieldChange2}
                                >
                                    <option value="">Select</option>
                                    <option value="democrat">Democrat</option>
                                    <option value="republican">Republican</option>
                                    <option value="independent">Independent</option>
                                </select>
                            </div>

                            <div className="form-group marginb-15" >
                                <h5 style={{ marginBottom: "2px" }}>Image URL</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageUrl2"
                                    name="imageUrl2"
                                    placeholder="Enter the imageURL"
                                    value={form2.imageUrl2}
                                    onChange={onFormFieldChange2}>
                                </input>
                            </div>


                            <div className="form-group text-center marginb-15">
                                <button
                                    type="submit"
                                    className="btn marg btn-primary m-3"
                                    id="submit2"
                                    onClick={onFormValidation}
                                >
                                    Submit
                                </button>
                                <button
                                    type="submit"
                                    className="btn marg btn-primary"
                                    id="reset2"
                                    onClick={onFormReset}
                                >
                                    Reset
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-5 m-2">
                        <h4 className="text-center">Rendering form 1</h4>
                        <div className="row justify-content-center">
                            {showForm1 && pageDataLeft.presidentsComponents1}
                        </div>

                    </div>
                    <div className="col-5 m-2">
                        <h4 className="text-center">Rendering form 2</h4>

                        <div className="row justify-content-center">
                            {showForm2 && pageDataRight.presidentsComponents2}
                        </div>

                    </div>
                </div>

                <div className="row justify-content-center">
                    <button
                        type="submit"
                        className="btn marg btn-success"
                        id="showWinner"
                        onClick={addWinner}
                    >
                        Show Winner
                    </button>

                </div>
            </div>



        </React.Fragment>
    )
}


export default PoliticalCandidates;