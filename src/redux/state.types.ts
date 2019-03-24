import { RouterState } from 'connected-react-router';
import { SessionsState } from './sessions';
import { ExercisesState } from './exercises';

export interface State {
  router: RouterState,
  sessions: SessionsState,
  exercises: ExercisesState,
};
