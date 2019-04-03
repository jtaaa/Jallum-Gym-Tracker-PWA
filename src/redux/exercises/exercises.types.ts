import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from './../state.types';

export enum ExercisesActionTypes {
  ADD_EXERCISES = 'ADD_EXERCISES',
  SET_EXERCISES = 'SET_EXERCISES',
};

export interface AddExercisesAction extends Action {
  type: ExercisesActionTypes.ADD_EXERCISES,
  payload: {
    exercises: Array<Exercise>,
  },
};

export interface SetExercisesAction extends Action {
  type: ExercisesActionTypes.SET_EXERCISES,
  payload: {
    exercises: Array<Exercise>,
  },
};

export type RefreshExercisesThunkAction = ThunkAction<Promise<void>, State, undefined, SetExercisesAction>;

export type AddExerciseThunkAction = ThunkAction<Promise<void>, State, undefined, AddExercisesAction>;

export type ExercisesAction = AddExercisesAction | SetExercisesAction;

export interface ExercisePartial {
  _id?: string,
  name: string,
  primaryMuscleGroups: Array<string>,
  secondaryMuscleGroups: Array<string>,
}

export interface Exercise {
  _id: string,
  name: string,
  primaryMuscleGroups: Array<string>,
  secondaryMuscleGroups: Array<string>,
};

export type ExercisesState = Array<Exercise>;
