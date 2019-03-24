import { RouterAction } from 'connected-react-router';

import { SessionsAction } from './sessions/session.types';
import { ExercisesAction } from './exercises/exercises.types';

export type ActionType = SessionsAction
                       | RouterAction
                       | ExercisesAction;
