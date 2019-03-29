import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { StartSessionAction } from './../../redux/sessions';
import { OptionsListOption } from './../../components/OptionsList/OptionsList.types';
import { Exercise } from '../../redux/exercises';

export interface AppReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => StartSessionAction,
  refreshExercises: () => Promise<void>,
};

export interface AppReduxStateProps {
  location: Location;
  exerciseOptions: Array<OptionsListOption<Exercise>>;
};

export type AppReduxProps = AppReduxStateProps & AppReduxDispatchProps;

export interface AppProps extends AppReduxProps {
};

export type AppOptionsListOption = OptionsListOption<Exercise>;

export interface AppState {
  muscleGroupOptions: Array<OptionsListOption>;
  exercise?: Exercise;
  reps: number;
  repsUnit: number;
  weight: number;
  weightUnit: number;
  inSet: boolean;
};

