import { RouterState } from 'connected-react-router';
import { SessionsState } from './sessions';
import { ExercisesState } from './exercises';
import { Profile } from './profile';

export interface State {
  router: RouterState;
  sessions: SessionsState;
  exercises: ExercisesState;
  profile: Profile;
};
