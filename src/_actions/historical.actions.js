import { historicalConstants } from '../_constants';
import { metalService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const historicalActions = {
    getHistorical,
};

function getHistorical(date) {
    return dispatch => {
        dispatch(request());

        metalService.getHistorical(date)
            .then(
                items => {
                    dispatch(success(items));
                    console.log("getHistorical action");
                    console.log(items);
                    // history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: historicalConstants.GETALL_REQUEST } }
    function success(items) { return { type: historicalConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: historicalConstants.GETALL_FAILURE, error } }
}

