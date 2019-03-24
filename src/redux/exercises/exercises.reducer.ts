import { ExercisesState, ExerciseAction, ExercisesActionTypes } from './exercises.types';

export const exercisesReducer = (state: ExercisesState = [], action: ExerciseAction): ExercisesState => {
  switch(action.type) {
    case ExercisesActionTypes.ADD_EXERCISES:
      return [ ...state, ...action.payload.exercises ];
    default:
      return state;
  }
};
