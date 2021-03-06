import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from './../state.types';

export enum SessionsActionTypes {
  START_SESSION = 'START_SESSION',
  END_SESSION = 'END_SESSION',
  START_SET = 'START_SET',
  END_SET = 'END_SET',
  SET_SESSIONS = 'SET_SESSIONS',
  CANCEL_SET = 'CANCEL_SET',
};

export interface StartSessionAction extends Action {
  type: SessionsActionTypes.START_SESSION;
  payload: {
    muscleGroups: Array<string>;
  };
};

export interface EndSessionAction extends Action {
  type: SessionsActionTypes.END_SESSION;
};

export interface SetSessionAction extends Action {
  type: SessionsActionTypes.SET_SESSIONS;
  payload: {
    sessions: Array<Session>;
  };
};

export type RefreshSessionsThunkAction = ThunkAction<Promise<void>, State, undefined, SetSessionAction>;

export type EndAndSaveSessionsThunkAction = ThunkAction<Promise<void>, State, undefined, EndSessionAction>;

export interface StartSetAction extends Action {
  type: SessionsActionTypes.START_SET;
  payload: {
    exercise: string;
  };
};

export interface EndSetAction extends Action {
  type: SessionsActionTypes.END_SET;
  payload: {
    reps: number;
    weight: number;
  };
};

export interface CancelSetAction extends Action {
  type: SessionsActionTypes.CANCEL_SET;
};

export type SessionsAction = StartSessionAction
                           | EndSessionAction
                           | StartSetAction
                           | EndSetAction
                           | SetSessionAction
                           | CancelSetAction;

export interface SetPartial {
  exercise: string,
  timestamp: Date,
  duration?: number,
  reps?: number,
  weight?: number,
};

export interface SessionPartial {
  timestamp: Date,
  duration?: number,
  muscleGroups: Array<string>,
  sets: Array<Set>,
};

export interface Set {
  exercise: string,
  timestamp: Date,
  duration: number,
  reps: number,
  weight: number,
};

export interface Session {
  timestamp: Date;
  duration: number;
  muscleGroups: Array<string>;
  sets: Array<Set>;
};

export interface SessionsState {
  currentSession?: SessionPartial;
  currentSet?: SetPartial;
  sessions: Array<Session>;
};
