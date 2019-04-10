import { Exercise, ExercisesActionTypes, AddExercisesAction, RefreshExercisesThunkAction, SetExercisesAction, AddExerciseThunkAction, ExercisePartial, GetExerciseConfigThunkAction } from './exercises.types';

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
    return exercises;
  }
;

export const getExerciseConfig = (exercise: Exercise, setPosition: number): GetExerciseConfigThunkAction =>
  async (dispatch, getState) => {
    const sessions = Array.from(getState().sessions.sessions);
    for (let i = sessions.length - 1; i >= 0; --i) {
      const matchingSets = sessions[i].sets.filter(set => set.exercise === exercise._id);
      let choiceIndex = setPosition;
      // choose the last weight completed if doing more sets than last time
      if (!matchingSets[choiceIndex]) choiceIndex = matchingSets.length - 1;
      if (matchingSets[choiceIndex]) return {
        weight: matchingSets[matchingSets.length - 1].weight,
        reps: matchingSets[matchingSets.length - 1].reps,
        weightUnit: exercise.defaultWeightUnit,
        repsUnit: exercise.defaultRepsUnit,
      };
    }
    return {
      weight: exercise.defaultWeight,
      reps: exercise.defaultReps,
      weightUnit: exercise.defaultWeightUnit,
      repsUnit: exercise.defaultRepsUnit,
    };
  }
;
