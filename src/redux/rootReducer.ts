import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { sessionsReducer } from './sessions/sessions.reducer';
import { exercisesReducer } from './exercises/exercises.reducer';
import { profileReducer } from './profile/profile.reducer';

const createRootReducer = (history: History<any>) => combineReducers({
  router: connectRouter(history),
  sessions: sessionsReducer,
  exercises: exercisesReducer,
  profile: profileReducer,
});

export { createRootReducer };
