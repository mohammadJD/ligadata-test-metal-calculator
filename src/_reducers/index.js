import { combineReducers } from 'redux';
import { historical } from './historical.reducer';
import { currency } from './currency.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    historical,
    currency,
    alert
});

export default rootReducer;
