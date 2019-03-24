import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { SessionsAction } from './../../redux/sessions';
import { OptionsListOptions } from '../../components/OptionsList/OptionsList.types';

export interface AppProps {
  location: Location,
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => SessionsAction,
};

export interface AppState {
  muscleGroupOptions: OptionsListOptions;
  exercise?: string;
  reps: number;
  weight: number;
}
