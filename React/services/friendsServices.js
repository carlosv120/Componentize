import axios from "axios";
import * as helper from "./serviceHelper"



const getAll = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/v3/friends/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
    //sometimes global handlers will be needed.
};


const deleteFriend = (id) => {

    const config = {
        method: "DELETE",
        url: `https://localhost:50001/api/v3/friends/${id}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => { return id });
};


const addFriend = (payload) => {

    const config = {
        method: "POST",
        url: `https://localhost:50001/api/v3/friends/`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess);

};


const editFriend = (payload) => {

    const config = {
        method: "PUT",
        url: `https://localhost:50001/api/v3/friends/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);

};

const searchFriend = (pageIndex, pageSize, query) => {

    const config = {
        method: "GET",
        url: `https://localhost:50001/api/v3/friends/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);

};



export { getAll, deleteFriend, addFriend, editFriend, searchFriend }