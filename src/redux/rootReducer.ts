import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { sessionsReducer } from './sessions/sessions.reducer';

const createRootReducer = (history: History<any>) => combineReducers({
  router: connectRouter(history),
  sessionsReducer,
});

export { createRootReducer };
