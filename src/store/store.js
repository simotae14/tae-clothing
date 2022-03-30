import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

// custom middleware logger
import {
  loggerMiddleware,
} from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistentReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && loggerMiddleware,
  thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistentReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
