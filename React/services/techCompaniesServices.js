import axios from "axios";
import * as helper from "./serviceHelper"


const getCompanies = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/techCompanies/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);

};

const searchCompanies = (pageIndex, pageSize, query) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/techCompanies/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);

};

const addCompany = (payload) => {
    const config = {
        method: "POST",
        url: `https://localhost:50001/api/techCompanies/`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);

};

const editCompany = (payload) => {

    const config = {
        method: "PUT",
        url: `https://localhost:50001/api/techCompanies/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);

};

const deleteCompany = (id) => {

    const config = {
        method: "DELETE",
        url: `https://localhost:50001/api/techCompanies/${id}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => { return id });
};


export { getCompanies, searchCompanies, addCompany, editCompany, deleteCompany }