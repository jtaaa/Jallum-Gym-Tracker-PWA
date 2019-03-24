import { RouterAction } from 'connected-react-router';

import { SessionAction } from './sessions/session.types';

export type ActionType = SessionAction
                       | RouterAction;
