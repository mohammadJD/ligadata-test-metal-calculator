import { currencyConstants } from '../_constants';
import { currencyService } from '../_services';

export const currencyActions = {
    getCurrency,
    setCurrency
};

function getCurrency() {
    return dispatch => {
        // let curr = currencyService.getCurrency();
        dispatch(request());
    };

    function request() { return { type: currencyConstants.GET_REQUEST } }
}

function setCurrency(val) {
    return dispatch => {
        dispatch(request(val));
        currencyService.setCurrency(val)
    };

    function request(currency) { return { type: currencyConstants.SET_REQUEST , currency} }
}

