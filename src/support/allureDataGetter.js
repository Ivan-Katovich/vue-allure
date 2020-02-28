import axios from "axios";

export function getSummary(suite) {
    return axios.get(`/${suite}/summary.json`)
        .then((res) => {
            return res.data;
        })
}

