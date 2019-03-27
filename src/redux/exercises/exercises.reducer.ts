import { ExercisesState, ExercisesAction, ExercisesActionTypes } from './exercises.types';

export const exercisesReducer = (state: ExercisesState = [], action: ExercisesAction): ExercisesState => {
  switch(action.type) {
    case ExercisesActionTypes.ADD_EXERCISES:
      return [ ...state, ...action.payload.exercises ];
    case ExercisesActionTypes.SET_EXERCISES:
      return action.payload.exercises;
    default:
      return state;
  }
};
