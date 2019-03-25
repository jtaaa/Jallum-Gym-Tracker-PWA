import { Exercise, ExercisesActionTypes, AddExercisesAction, RefreshExercisesThunkAction, SetExercisesAction } from './exercises.types';

import { Dispatch } from 'redux';

export const addExercises = (exercises: Array<Exercise>): AddExercisesAction => ({
  type: ExercisesActionTypes.ADD_EXERCISES,
  payload: { exercises },
});

const setExercises = (exercises: Array<Exercise>): SetExercisesAction => ({
  type: ExercisesActionTypes.SET_EXERCISES,
  payload: { exercises },
});

export const refreshExercises = (): RefreshExercisesThunkAction =>
  async (dispatch: Dispatch) => {
    const resp = await fetch('/api/exercises');
    if (!resp.ok) return console.log('Huh, I couldn\'t exercises from the backend. Weird.');
    const exercises = await resp.json();
    dispatch(setExercises(exercises));
  }
;
