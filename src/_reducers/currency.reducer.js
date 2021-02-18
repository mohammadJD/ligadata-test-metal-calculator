import { currencyConstants } from '../_constants';

let curr = JSON.parse(localStorage.getItem('currency'));
if(curr===null) {
    localStorage.setItem('currency',JSON.stringify('USD'));
}
const initialState = JSON.parse(localStorage.getItem('currency'));

export function currency(state = initialState, action) {
    switch (action.type) {
        case currencyConstants.GET_REQUEST:
            return {
                currency: state
            };
        case currencyConstants.SET_REQUEST:
            return {
                currency: action.currency
            };
        default:
            return state
    }
}
