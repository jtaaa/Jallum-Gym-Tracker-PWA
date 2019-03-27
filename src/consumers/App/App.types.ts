import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { StartSessionAction } from './../../redux/sessions';
import { OptionsListOptions } from './../../components/OptionsList/OptionsList.types';

export interface AppReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => StartSessionAction,
  refreshExercises: () => Promise<void>,
};

export interface AppReduxStateProps {
  location: Location;
  exercisesOptions: OptionsListOptions;
};

export type AppReduxProps = AppReduxStateProps & AppReduxDispatchProps;

export interface AppProps extends AppReduxProps {
};

export interface AppState {
  muscleGroupOptions: OptionsListOptions;
  exercise?: string;
  reps: number;
  weight: number;
};

