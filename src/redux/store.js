import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// define the middlewares used
const middlewares = [];

// add the logger middleware just in dev mode
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// create the store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistore = persistStore(store);

export default { store, persistore };