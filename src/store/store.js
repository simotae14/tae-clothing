import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

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
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistentReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
