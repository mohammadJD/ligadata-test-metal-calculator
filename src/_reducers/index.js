import { combineReducers } from 'redux';
import { historical } from './historical.reducer';

const rootReducer = combineReducers({
    historical,
});

export default rootReducer;
