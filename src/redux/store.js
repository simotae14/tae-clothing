import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// define the middlewares used
const middlewares = [logger];

// create the store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistore = persistStore(store);

export default { store, persistore };