import axios from "axios";

export function getSummary(suite) {
    return axios.get(`/${suite}/summary.json`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
}

