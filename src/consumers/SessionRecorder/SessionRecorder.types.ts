import { Location } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

import { StartSessionAction, StartSetAction, EndSetAction } from './../../redux/sessions';
import { OptionsListOption } from './../../components/OptionsList/OptionsList.types';
import { Exercise, ExercisePartial, ExerciseConfig } from '../../redux/exercises';

export interface SessionRecorderReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
  startSession: (muscleGroups: Array<string>) => StartSessionAction,
  endSession: () => Promise<void>,
  startSet: (exercise: string) => StartSetAction,
  endSet: (reps: number, weight: number) => EndSetAction,
  refreshExercises: () => Promise<void>,
  refreshSessions: () => Promise<void>,
  addExercise: (exercise: ExercisePartial) => Promise<Exercise>,
  getExerciseConfig: (exercise: Exercise, setPosition: number) => Promise<ExerciseConfig>,
};

export interface SessionRecorderReduxStateProps {
  location: Location;
  exerciseOptions: Array<OptionsListOption<Exercise>>;
};

export type SessionRecorderReduxProps = SessionRecorderReduxStateProps & SessionRecorderReduxDispatchProps;

export interface SessionRecorderProps extends SessionRecorderReduxProps {
};

export type SessionRecorderOptionsListOption = OptionsListOption<Exercise>;

export interface SessionRecorderState {
  sessionMuscleGroupOptions: Array<OptionsListOption>;
  newExerciseMuscleGroupOptions: Array<OptionsListOption>;
  exercise?: Exercise;
  reps: number;
  repsUnit: number;
  weight: number;
  weightUnit: number;
  inSet: boolean;
  setSummaries: Array<string>;
  newExercise: string;
  newExerciseOptions: Array<SessionRecorderOptionsListOption>;
};

