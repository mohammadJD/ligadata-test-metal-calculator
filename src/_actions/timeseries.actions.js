import { timeSeriesConstants } from '../_constants';
import { metalService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const timeSeriesActions = {
    getTimeSeries,
    getTimeSeriesRequest,
    getTimeSeriesSuccess,
    getTimeSeriesFailure
};

function getTimeSeries(currency,startDate,endDate,symbols) {
    return dispatch => {
        dispatch(getTimeSeriesRequest());

        metalService.getTimeSeries(currency,startDate,endDate,symbols)
            .then(
                items => {
                    dispatch(getTimeSeriesSuccess(items));
                    // history.push(from);
                },
                error => {
                    dispatch(getTimeSeriesFailure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };


}

function getTimeSeriesRequest() { return { type: timeSeriesConstants.GETALL_REQUEST } }
function getTimeSeriesSuccess(items) { return { type: timeSeriesConstants.GETALL_SUCCESS, items } }
function getTimeSeriesFailure(error) { return { type: timeSeriesConstants.GETALL_FAILURE, error } }

