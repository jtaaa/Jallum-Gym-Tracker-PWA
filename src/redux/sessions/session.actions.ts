import { SessionActionTypes, SessionAction } from './session.types';

export const startSession = (muscleGroups: Array<string>): SessionAction => ({
  type: SessionActionTypes.START_SESSION,
  payload: { muscleGroups },
});

export const endSession = (): SessionAction => ({
  type: SessionActionTypes.END_SESSION,
});

export const startSet = (exercise: string): SessionAction => ({
  type: SessionActionTypes.START_SET,
  payload: { exercise },
});

export const endSet = (reps: number, weight: number): SessionAction => ({
  type: SessionActionTypes.END_SET,
  payload: { reps, weight },
});
