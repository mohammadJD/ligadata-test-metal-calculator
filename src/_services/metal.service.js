import { config } from '../_helpers';
import {useSelector} from "react-redux";

export const metalService = {
    getLatest,
    getHistorical,
    getTimeSeries,
    convert
};

function getLatest() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/latest?access_key=${config.accessKey}&base=USD&symbols=XAU,XAG`, requestOptions).then(handleResponse);
}

function getHistorical(currency,date,symbols) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/${date}?access_key=${config.accessKey}&base=${currency}&symbols=${symbols}`, requestOptions).then(handleResponse);
}

function getTimeSeries(currency,startDate,endDate,symbols) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/timeseries?access_key=${config.accessKey}&base=${currency}&symbols=${symbols}&start_date=${startDate}&end_date=${endDate}`, requestOptions).then(handleResponse);
}

function convert(currency,toCurrency,amount) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/convert?access_key=${config.accessKey}&from=${currency}&to=${toCurrency}&amount=${amount}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
