import { SessionsActionTypes, StartSessionAction, StartSetAction, EndSessionAction, EndSetAction } from './sessions.types';

export const startSession = (muscleGroups: Array<string>): StartSessionAction => ({
  type: SessionsActionTypes.START_SESSION,
  payload: { muscleGroups },
});

export const endSession = (): EndSessionAction => ({
  type: SessionsActionTypes.END_SESSION,
});

export const startSet = (exercise: string): StartSetAction => ({
  type: SessionsActionTypes.START_SET,
  payload: { exercise },
});

export const endSet = (reps: number, weight: number): EndSetAction => ({
  type: SessionsActionTypes.END_SET,
  payload: { reps, weight },
});
