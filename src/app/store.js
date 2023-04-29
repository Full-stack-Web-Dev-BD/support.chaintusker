import { configureStore } from '@reduxjs/toolkit';
import saga from 'redux-saga';
import logger from 'redux-logger';
import loginReducer from '../features/login/loginSlice';
import fetchAllReducer from '../features/projects/fetchAllSlice';
import fetchProjectReducer from '../features/projects/fetchProjectSlice';
import rootSaga from './rootSaga';

// Saga Middleware
const sagaMiddleware = saga();

const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

// Store
export const store = configureStore({
  reducer: {
    login: loginReducer,
    fetchAll: fetchAllReducer,
    fetchProject: fetchProjectReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({thunk: false}),
    ...middleware,
  ]
});

// Run Saga
sagaMiddleware.run(rootSaga);
