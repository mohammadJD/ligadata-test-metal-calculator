import { historicalConstants } from '../_constants';

export function historical(state = {}, action) {
    switch (action.type) {
        case historicalConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case historicalConstants.GETALL_SUCCESS:
            return {
                items: action.rates
            };
        case historicalConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
