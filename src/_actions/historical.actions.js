import { historicalConstants } from '../_constants';
import { metalService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const historicalActions = {
    getHistorical,
    getHistoricalRequest,
    getHistoricalSuccess,
    getHistoricalFailure
};

function getHistorical(currency,date,symbols) {
    return dispatch => {
        dispatch(getHistoricalRequest());

        metalService.getHistorical(currency,date,symbols)
            .then(
                items => {
                    dispatch(getHistoricalSuccess(items));
                    // history.push(from);
                },
                error => {
                    dispatch(getHistoricalFailure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };


}

function getHistoricalRequest() { return { type: historicalConstants.GETALL_REQUEST } }
function getHistoricalSuccess(items) { return { type: historicalConstants.GETALL_SUCCESS, items } }
function getHistoricalFailure(error) { return { type: historicalConstants.GETALL_FAILURE, error } }

