import { RouterState } from 'connected-react-router';
import { SessionsState } from './sessions';

export interface State {
  router: RouterState,
  sessions: SessionsState,
};
