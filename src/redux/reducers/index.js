import {combineReducers} from 'redux';
import {fundReducer} from './fundReducer';
import {holdingReducer} from './holdingReducer';

export const rootReducer = combineReducers({
  funds: fundReducer,
  holdings: holdingReducer,
});
