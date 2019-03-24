import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { SessionAction } from './../../redux/sessions';

export interface AppProps {
  location: Location,
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => SessionAction,
};

export interface AppState {
  muscleGroups: Array<string>;
  exercise?: string;
  reps: number;
  weight: number;
}
