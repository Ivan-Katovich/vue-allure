import axios from "axios";

export function getSummary(suite) {
    const url = process.env.NODE_ENV === 'production' ?
        `${process.env.BASE_URL}${suite}/widgets/summary.json` :
        `${process.env.BASE_URL}${suite}-fake/summary.json`;
    return axios.get(url)
        .then((res) => {
            return res.data;
        })
}

export function getCategories(suite) {
    const url = process.env.NODE_ENV === 'production' ?
        `${process.env.BASE_URL}${suite}/widgets/categories-trend.json` :
        `${process.env.BASE_URL}${suite}-fake/categories-trend.json`;
    return axios.get(url)
        .then((res) => {
            return res.data[0].data;
        })
}

