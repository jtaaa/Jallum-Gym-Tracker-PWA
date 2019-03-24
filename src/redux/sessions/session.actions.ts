import { SessionsActionTypes, SessionsAction } from './session.types';

export const startSession = (muscleGroups: Array<string>): SessionsAction => ({
  type: SessionsActionTypes.START_SESSION,
  payload: { muscleGroups },
});

export const endSession = (): SessionsAction => ({
  type: SessionsActionTypes.END_SESSION,
});

export const startSet = (exercise: string): SessionsAction => ({
  type: SessionsActionTypes.START_SET,
  payload: { exercise },
});

export const endSet = (reps: number, weight: number): SessionsAction => ({
  type: SessionsActionTypes.END_SET,
  payload: { reps, weight },
});
