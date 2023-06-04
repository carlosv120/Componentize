import React from 'react'

import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';


import * as eventsServices from "../../services/eventsServices"
import MapEvents from "./MapEvents";

import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";


//import Swal from 'sweetalert2'


import toastr from "toastr"


function Events() {
    const [pageData, setPageData] = useState({ arrayOfEvents: [], eventsComponents: [] });

    const [paginationData, setPaginationData] = useState({ pageIndex: 0, pageSize: 3, current: 1, total: 1 })

    const [eventVisualization, setEventVisualization] = useState({ currentEvent: [], currentEventComponents: [] });

    var autocompleteGoogle = null;


    const [newEvent, setNewEvent] = useState({
        name: "",
        headline: "",
        description: "",
        summary: "",
        slug: "",
        statusId: "",
        dateStart: "",
        dateEnd: "",
        latitude: 0,
        longitude: 0,
        address: ""
    });


    //THIS IS TO RENDER ONLY THE FIRST TIME THE LASTEST EVENT.
    useEffect(() => {

        eventsServices.getAll(0, 100).then(onSuccessFistTime).catch(() => console.log("error"))

    }, [])
    const onSuccessFistTime = (data) => {

        var arrayOfEvents = data.item.pagedItems; //all the elements

        setEventVisualization((previousState) => {

            const newState = { ...previousState };

            newState.currentEvent = arrayOfEvents[0]; //this is directly an object

            newState.currentEventComponents = mappingEventLeftSide(newState.currentEvent)

            return newState
        })

    }


    useEffect(() => {

        eventsServices.getAll(paginationData.pageIndex, paginationData.pageSize).then(onSuccessGetAll).catch(onErrorGetAll)

    }, [paginationData.pageIndex])


    const onSuccessGetAll = (data) => {

        var arrayOfEvents = data.item.pagedItems;

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfEvents = arrayOfEvents;

            pageData.eventsComponents = arrayOfEvents.map(mapEvents);

            return pageData
        })

        setPaginationData((previousState) => {

            const newState = { ...previousState };

            newState.total = data.item.totalCount;

            return newState;

        })

    };

    const mappingEventLeftSide = (eventObject) => {

        const eventDay = eventObject.metaData.dateStart;
        const [date] = eventDay.split("T"); //add variable time if required
        const [year, month, day] = date.split("-");
        const eventDayFixed = new Date(+year, +month - 1, +day).toDateString();

        // const [hour, minute] = time.split(":");
        // const amPm = hour < 12 ? "AM" : "PM";
        // const timeFixed = `${hour}:${minute} ${amPm}`

        const mapLocation = {
            lat: eventObject.metaData.location.latitude,
            lng: eventObject.metaData.location.longitude
        };

        const containerStyle = {
            width: '350px',
            height: '300px'
        };

        return (

            <div className='row'>
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="row no-gutters">

                        <div className="col-md-5 mt-3" style={{ paddingLeft: "25px", paddingRight: "0px" }}>
                            <img src={eventObject.slug} className="card-img-top" alt="image_event" />
                        </div>

                        <div className="col-md-7">
                            <div className="card-body" style={{ paddingTop: "5px" }}>
                                <h2 className="card-title">{eventObject.name}</h2>
                                <h4 className="card-summary">{eventObject.summary}</h4>
                                <p className="card-description">{eventObject.description}</p>

                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 mt-4" style={{ paddingLeft: "25px", paddingRight: "0px", paddingBottom: "15px", }}>
                            <LoadScript
                                googleMapsApiKey=""
                            >
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={mapLocation}
                                    zoom={13}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}

                                    <Marker
                                        position={mapLocation}
                                    ></Marker>
                                </GoogleMap>
                            </LoadScript>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h3 className="card-title">Location:</h3>
                                <h5 className="card-address mb-4">{eventObject.metaData.location.address} {eventObject.metaData.location.zipCode}</h5>
                                <h6 className="card-date">{eventDayFixed}</h6>
                                {/* <h6 className="card-date">{timeFixed}</h6> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )

    };

    const onErrorGetAll = (error) => {

        console.log(error);
    };

    const mapEvents = (anEventObject) => {

        return (
            <MapEvents
                event={anEventObject}
                key={"ListF-" + anEventObject.id}
                onEventViewMore={onClickViewMore}
            //onEventEdit={onClickEdit}
            >
            </MapEvents>
        )
    };


    const onChange = (page) => {

        setPaginationData((previousState) => {

            const newState = { ...previousState };

            newState.current = page;
            newState.pageIndex = page - 1;

            return newState
        });



    };

    const onAddEvent = (anEvent) => {

        autocompleteGoogle = null;

        if (anEvent.currentTarget) {

            anEvent = newEvent;
        }

    };

    const onFormSubmit = () => {

        const payload = { ...newEvent };

        payload.address = autocompleteGoogle.address;
        payload.latitude = autocompleteGoogle.latitude;
        payload.longitude = autocompleteGoogle.longitude;

        console.log("submitting form", payload);

    }


    const onFormFieldChange = (event) => {

        const target = event.target;

        const valueOfTheField = target.value;

        const nameOfTheFormField = target.name;

        setNewEvent((prevState) => {

            const newState = { ...prevState };

            newState[nameOfTheFormField] = valueOfTheField;

            return newState;
        });
    };


    const onClickViewMore = (anEvent) => {


        setEventVisualization((previousState) => {

            const newState = { ...previousState };

            newState.currentEvent = anEvent; //this is directly an object

            newState.currentEventComponents = mappingEventLeftSide(newState.currentEvent)

            return newState
        })

    };

    //     const onClickEdit = (anEvent) => {
    // 
    //         onAddEvent(anEvent);
    //     };

    const searchEvent = () => {

        toastr.warning("Search Function not implemented at this point", "Information");

    }

    const viewAllEvents = () => {

        toastr.warning("View All Events not implemented at this point", "Information");
    }

    const onLoad = (autocomplete) => {
        console.log('autocomplete: ', autocomplete)

        autocompleteGoogle = autocomplete
    }

    const onPlaceChanged = () => {

        if (autocompleteGoogle !== null) {

            console.log(autocompleteGoogle.getPlace())

            autocompleteGoogle.address = autocompleteGoogle.getPlace().formatted_address;
            autocompleteGoogle.latitude = autocompleteGoogle.getPlace().geometry.location.lat();
            autocompleteGoogle.longitude = autocompleteGoogle.getPlace().geometry.location.lng();

            console.log(autocompleteGoogle)

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }


    return (
        <React.Fragment>
            <div className="container shadow p-3 mb-5 rounded" style={{ backgroundColor: 'rgb(150 189 200)', padding: "12px" }}>

                <div className='row p-4 justify-content-center' >
                    <div className='col-7 m-4'>

                        {eventVisualization.currentEventComponents}

                    </div>

                    <div className='col-4 m-4'>
                        <div className='row ml-3'>
                            <div className="card shadow p-3 mb-4 bg-white rounded">
                                <div className="row no-gutters">
                                    <div className="col-md">
                                        <div className="card-body" style={{ paddingTop: "5px" }}>

                                            <h4 className="card-summary">Search Events from:</h4>


                                            <button
                                                type="submit"
                                                className="btn btn-secondary"
                                                id="searchEvents"
                                                onClick={searchEvent}
                                            >
                                                Search
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='row ml-3 mt-3'>
                            <div className="card shadow p-3 mb-4 bg-white rounded">
                                <div className="row no-gutters">
                                    <div className="col-md">
                                        <div className="card-body" style={{ paddingTop: "5px" }}>

                                            <button
                                                type="submit"
                                                className="btn btn-info"
                                                id="addEvent"
                                                style={{ marginInline: "25px" }}
                                                onClick={onAddEvent}
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Add Event
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                                id="viewAllMap"
                                                onClick={viewAllEvents}
                                            >
                                                View All Events On Map
                                            </button>

                                            <h4 className="card-summary mt-3">Upcoming Events:</h4>
                                            {<Pagination
                                                style={{ marginBlock: "15px" }}
                                                onChange={onChange}
                                                current={paginationData.current}
                                                total={paginationData.total}
                                                pageSize={paginationData.pageSize}
                                                locale={locale}
                                            />}

                                            {pageData.eventsComponents}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title text-center" id="exampleModalLabel">Add Event</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label>
                                        <h5>Name</h5>
                                    </label>
                                    <input
                                        type="textarea"
                                        className="form-control mb-4"
                                        id="name"
                                        name="name"
                                        placeholder="Enter the name of the event"
                                        value={newEvent.name}
                                        onChange={onFormFieldChange}
                                    >
                                    </input>
                                    <label>
                                        <h5>Headline</h5>
                                    </label>
                                    <input
                                        type="textarea"
                                        className="form-control mb-4"
                                        id="headline"
                                        name="headline"
                                        placeholder="Enter the headline of the event"
                                        value={newEvent.headline}
                                        onChange={onFormFieldChange}>
                                    </input>
                                    <label>
                                        <h5>Description</h5>
                                    </label>
                                    <input
                                        type="textarea"
                                        className="form-control mb-4"
                                        id="description"
                                        name="description"
                                        placeholder="Enter the description of the event"
                                        value={newEvent.description}
                                        onChange={onFormFieldChange}>
                                    </input>
                                    <label>
                                        <h5>Summary</h5>
                                    </label>
                                    <input
                                        type="textarea"
                                        className="form-control mb-4"
                                        id="summary"
                                        name="summary"
                                        placeholder="Enter the summary of the event"
                                        value={newEvent.summary}
                                        onChange={onFormFieldChange}>
                                    </input>

                                    <div className='row'>
                                        <div className='col-9'>
                                            <label>
                                                <h5>Slug</h5>
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control mb-4"
                                                id="slug"
                                                name="slug"
                                                value={newEvent.slug}
                                                onChange={onFormFieldChange}>
                                            </input>
                                        </div>
                                        <div className='col-3'>
                                            <label>
                                                <h5>Status Id</h5>
                                            </label>
                                            <select
                                                className="form-select mb-4"
                                                id="statusId"
                                                name="statusId"
                                                value={newEvent.statusId}
                                                onChange={onFormFieldChange}>
                                                <option value={"none"}>Id</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </div>
                                    </div>



                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>
                                                <h5>Date Start</h5>
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control mb-4"
                                                id="dateStart"
                                                name="dateStart"
                                                onChange={onFormFieldChange}
                                            >
                                            </input>

                                        </div>
                                        <div className='col-6'>
                                            <label>
                                                <h5>Date End</h5>
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control mb-4"
                                                id="dateEnd"
                                                name="dateEnd"
                                                onChange={onFormFieldChange}>
                                            </input>
                                        </div>
                                    </div>

                                    <label>
                                        <h5>Address</h5>
                                    </label>
                                    <LoadScript
                                        googleMapsApiKey="AIzaSyDYl5IIXOwXlcYh_x9RnT_dQoNUKWOL96U"
                                        libraries={["places"]}
                                        className='pac-container'
                                    >
                                        <Autocomplete
                                            onLoad={onLoad}
                                            onPlaceChanged={onPlaceChanged}
                                        >
                                            <input
                                                type="textarea"
                                                placeholder="Enter the address of the event"
                                                className='form-control border-2 mb-4'
                                            />
                                        </Autocomplete>

                                    </LoadScript>

                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onFormSubmit}>
                                        Add Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </React.Fragment>
    )
}

export default Events
