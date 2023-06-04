import axios from "axios";

const add = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/politicalCandidates",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(function (response) {
        return { id: response.data.item, ...payload };
    })
};


export { add }