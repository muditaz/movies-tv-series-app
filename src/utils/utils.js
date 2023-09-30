import { BASE_URL, headers } from "../constants/constants";

export const apiCall = async (url, params) => {
    try {
        const response = await fetch(BASE_URL + url, { headers, params });
        const result = await response.json();
        return(result);
    } catch(err) {
        return(err);
    }
};