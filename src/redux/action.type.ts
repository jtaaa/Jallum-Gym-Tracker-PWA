import { RouterAction } from 'connected-react-router';

import { SessionsAction } from './sessions/session.types';

export type ActionType = SessionsAction
                       | RouterAction;
