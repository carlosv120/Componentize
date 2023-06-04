import axios from "axios";

const getAll = () => {

    const config = {
        method: "GET",
        url: "https://my-json-server.typicode.com/selvaicodes/cars/cars",
        //data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { getAll }