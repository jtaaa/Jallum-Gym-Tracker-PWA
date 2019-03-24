import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { SessionsAction } from './../../redux/sessions';
import { OptionsListOptions } from '../../components/OptionsList/OptionsList.types';
import { Exercise, ExercisesAction } from '../../redux/exercises';

export interface AppReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => SessionsAction,
  addExercises: (exercises: Array<Exercise>) => ExercisesAction,
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

