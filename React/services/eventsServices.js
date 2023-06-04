import axios from "axios";
import * as helper from "./serviceHelper"


const getAll = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/events/feed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
    //sometimes global handlers will be needed.
};

const addEvent = (payload) => {

    const config = {
        method: "POST",
        url: `https://api.remotebootcamp.dev/api/events`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);

};

const editEvent = (payload) => {

    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/events/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);

};

const updateFile = () => {

    const config = {
        method: "POST",
        url: `https://api.remotebootcamp.dev/api/files`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);

}

export { getAll, addEvent, editEvent, updateFile }