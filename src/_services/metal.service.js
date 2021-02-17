import { config } from '../_helpers';

export const metalService = {
    getLatest,
    getHistorical
};

function getLatest() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/latest?access_key=${config.accessKey}&base=USD&symbols=XAU,XAG`, requestOptions).then(handleResponse);
}

function getHistorical(date) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/${date}?access_key=${config.accessKey}&base=USD&symbols=XAU,XAG`, requestOptions).then(handleResponse);
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
