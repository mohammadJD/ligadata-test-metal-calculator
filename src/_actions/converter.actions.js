import { converterConstants } from '../_constants';
import { metalService } from '../_services';

export const converterActions = {
    getConverterRequest,
    getConverterSuccess,
    getConverterFailure
};

function getConverterRequest() { return { type: converterConstants.GETALL_REQUEST } }
function getConverterSuccess(items) { return { type: converterConstants.GETALL_SUCCESS, items } }
function getConverterFailure(error) { return { type: converterConstants.GETALL_FAILURE, error } }
