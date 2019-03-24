import { SessionAction, SessionActionTypes, SessionsState } from './session.types';

export const sessionsReducer = (state: SessionsState = { sessions: [] }, action: SessionAction): SessionsState => {
  switch(action.type) {
    case SessionActionTypes.START_SESSION:
      return ({
        ...state,
        currentSession: { timestamp: new Date(), muscleGroups: action.payload.muscleGroups, sets: [] },
      });
    case SessionActionTypes.END_SESSION:
      if (!state.currentSession) {
        console.warn('Tried to end session with no current session. This is a no-op.');
        return state;
      }
      return ({
        ...state,
        currentSession: undefined,
        sessions: [
          ...state.sessions,
          {
            ...state.currentSession,
            duration: Date.now() - state.currentSession.timestamp.valueOf(),
          }
        ],
      });
    case SessionActionTypes.START_SET:
      return ({
        ...state,
        currentSet: { timestamp: new Date(), exercise: action.payload.exercise },
      });
    case SessionActionTypes.END_SET:
      if (!state.currentSession) {
        console.warn('Tried to end set with no current session. This is a no-op.');
        return state;
      }
      if (!state.currentSet) {
        console.warn('Tried to end set with no current set. This is a no-op.');
        return state;
      }
      return ({
        ...state,
        currentSet: undefined,
        currentSession: {
          ...state.currentSession,
          sets: [
            ...state.currentSession.sets,
            {
              ...state.currentSet,
              duration: Date.now() - state.currentSession.timestamp.valueOf(),
              reps: action.payload.reps,
              weight: action.payload.weight,
            },
          ],
        },
      });
    default:
      return state;
  };
};