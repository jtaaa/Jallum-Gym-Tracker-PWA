export enum SessionActionTypes {
  START_SESSION,
  END_SESSION,
  START_SET,
  END_SET,
};

interface StartSessionAction {
  type: SessionActionTypes.START_SESSION;
  payload: {
    muscleGroups: Array<string>;
  };
};

interface EndSessionAction {
  type: SessionActionTypes.END_SESSION;
};

interface StartSetAction {
  type: SessionActionTypes.START_SET;
  payload: {
    exercise: string;
  };
};

interface EndSetAction {
  type: SessionActionTypes.END_SET;
  payload: {
    reps: number;
    weight: number;
  };
};

export type SessionAction = StartSessionAction
                          | EndSessionAction
                          | StartSetAction
                          | EndSetAction;

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
