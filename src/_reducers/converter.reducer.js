import { converterConstants } from '../_constants';

export function converter (state = {}, action) {
    switch (action.type) {
        case converterConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case converterConstants.GETALL_SUCCESS:
            return {
                items: action.result
            };
        case converterConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
