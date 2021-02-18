import { timeSeriesConstants } from '../_constants';

export function timeSeries(state = {}, action) {
    switch (action.type) {
        case timeSeriesConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case timeSeriesConstants.GETALL_SUCCESS:
            return {
                items: action.rates
            };
        case timeSeriesConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
