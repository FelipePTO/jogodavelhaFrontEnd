import reducers from './../Reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware()(createStore);
//export const store = createStoreWithMiddleware(reducers);
export const store = createStore(reducers, applyMiddleware(thunk));
