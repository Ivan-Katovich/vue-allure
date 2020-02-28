import axios from "axios";

export function getSummary(suite) {
    const url = process.env.NODE_ENV === 'production' ?
        `${process.env.BASE_URL}${suite}/widgets/summary.json` :
        `${process.env.BASE_URL}${suite}-summ/summary.json`;
    return axios.get(url)
        .then((res) => {
            return res.data;
        })
}

