import {createStore, combineReducers} from 'redux';
import commonReducer from './reducers';

const reducer = combineReducers({
  common: commonReducer
})

const store = createStore(reducer);

export default store;

