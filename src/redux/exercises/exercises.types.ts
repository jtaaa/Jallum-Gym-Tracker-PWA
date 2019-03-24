import { Action } from 'redux';

export enum ExercisesActionTypes {
  ADD_EXERCISES = 'ADD_EXERCISES',
};

export interface AddExercisesAction extends Action {
  type: ExercisesActionTypes.ADD_EXERCISES,
  payload: {
    exercises: Array<Exercise>,
  },
};

export type ExercisesAction = AddExercisesAction;

export interface Exercise {
  name: string,
  primaryMuscleGroups: Array<string>,
  secondaryMuscleGroups: Array<string>,
};

export type ExercisesState = Array<Exercise>;
