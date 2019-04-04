import { Exercise, ExercisesActionTypes, AddExercisesAction, RefreshExercisesThunkAction, SetExercisesAction, AddExerciseThunkAction, ExercisePartial } from './exercises.types';

import { defaultFetchHeaders, API } from '../../utils';

const addExercises = (exercises: Array<Exercise>): AddExercisesAction => ({
  type: ExercisesActionTypes.ADD_EXERCISES,
  payload: { exercises },
});

const setExercises = (exercises: Array<Exercise>): SetExercisesAction => ({
  type: ExercisesActionTypes.SET_EXERCISES,
  payload: { exercises },
});

export const refreshExercises = (): RefreshExercisesThunkAction =>
  async (dispatch) => {
    const resp = await fetch(API`/exercises`);
    if (!resp.ok) return console.log('Huh, I couldn\'t exercises from the backend. Weird.');
    const exercises = await resp.json();
    dispatch(setExercises(exercises));
  }
;

export const addExercise = (exercise: ExercisePartial): AddExerciseThunkAction =>
  async (dispatch) => {
    const resp = await fetch(API`/exercises`, {
      method: 'PUT',
      headers: defaultFetchHeaders,
      body: JSON.stringify(exercise),
    });
    if (!resp.ok) return console.log('Huh, I couldn\'t save the exercise in the backend. Weird.');
    const exercises = await resp.json();
    dispatch(addExercises([ exercises ]));
  }
;
