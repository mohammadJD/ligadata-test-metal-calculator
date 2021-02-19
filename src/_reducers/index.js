import { combineReducers } from 'redux';
import { historical } from './historical.reducer';
import { currency } from './currency.reducer';
import { alert } from './alert.reducer';
import { timeSeries } from './timeseries.reducer';
import { converter } from './converter.reducer';

const rootReducer = combineReducers({
    historical,
    currency,
    alert,
    timeSeries,
    converter
});

export default rootReducer;
