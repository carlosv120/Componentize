import axios from "axios";
import * as helper from "./serviceHelper"


const getAllJobs = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/jobs/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
    //sometimes global handlers will be needed.
};


const searchJob = (pageIndex, pageSize, query) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/jobs/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);

};

const addJob = (payload) => {

    const config = {
        method: "POST",
        url: `https://localhost:50001/api/jobs`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
    //sometimes global handlers will be needed.
};

const editJob = (payload) => {

    const config = {
        method: "PUT",
        url: `https://localhost:50001/api/jobs/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);

};

const deleteJob = (id) => {

    const config = {
        method: "DELETE",
        url: `https://localhost:50001/api/jobs/${id}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(() => { return id });
    //id to be deleted is passed
};


export { getAllJobs, searchJob, addJob, editJob, deleteJob }