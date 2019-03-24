import { Exercise, ExercisesActionTypes, AddExercisesAction } from './exercises.types';

export const addExercises = (exercises: Array<Exercise>): AddExercisesAction => ({
  type: ExercisesActionTypes.ADD_EXERCISES,
  payload: { exercises },
});
