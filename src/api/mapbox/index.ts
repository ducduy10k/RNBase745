import axios from "axios";
const apiKey = 'sk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNsd2o1cGRmcTBxZGsyaXBmd2J2emRwc28ifQ.sg6Y6R2AWkqU5v0HwXHCyQ';

function geocoding(params: Object) {
    return axios.get('https://api.mapbox.com/search/geocode/v6/forward', {
        params
    })
}

export function search(searchString: string, p?: Object) {
    if (!p) p = {};
    const params = {
        limit: 10,
        country: 'vn',
        language: 'en',
        ...p,
        q: searchString,
        access_token: apiKey
    }
    return axios.get('https://api.mapbox.com/search/geocode/v6/forward', {
        params
    })
}