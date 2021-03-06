import { RouterAction } from 'connected-react-router';

import { SessionsAction } from './sessions/sessions.types';
import { ExercisesAction } from './exercises/exercises.types';
import { ProfileAction } from './profile/profile.types';

export type ActionType = SessionsAction
                       | RouterAction
                       | ExercisesAction
                       | ProfileAction;
