import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import commonReducer from './reducers';
import orderDemoReducer from '../views/order-demo/store/reducers'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));

const reducer = combineReducers({
  common: commonReducer,
  order: orderDemoReducer
})

const store = createStore(reducer, enhancer);

export default store;

