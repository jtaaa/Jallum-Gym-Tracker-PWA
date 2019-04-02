import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { Session } from './../../redux/sessions';

export interface SessionTrackerReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
};

export interface SessionTrackerReduxStateProps {
  location: Location;
  sessions: Array<Session>;
};

export type SessionTrackerReduxProps = SessionTrackerReduxStateProps & SessionTrackerReduxDispatchProps;

export interface SessionTrackerProps extends SessionTrackerReduxProps {};

export interface SessionTrackerState {};

