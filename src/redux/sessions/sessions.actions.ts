import { SessionsActionTypes, StartSessionAction, StartSetAction, EndSessionAction, EndSetAction, RefreshSessionsThunkAction, EndAndSaveSessionsThunkAction, SetSessionAction, Session, CancelSetAction } from './sessions.types';

import { defaultFetchHeaders, API } from './../../utils';
import { Action } from 'redux';

export const setSessions = (sessions: Array<Session>): SetSessionAction => ({
  type: SessionsActionTypes.SET_SESSIONS,
  payload: { sessions },
});

export const refreshSessions = (): RefreshSessionsThunkAction =>
  async (dispatch) => {
    const resp = await fetch(API`/sessions`, { credentials: 'include' });
    if (!resp.ok) return console.log('Huh, I couldn\'t get your session. Weird.');
    const sessions = await resp.json();
    dispatch(setSessions(sessions));
  }
;

export const startSession = (muscleGroups: Array<string>): StartSessionAction => ({
  type: SessionsActionTypes.START_SESSION,
  payload: { muscleGroups },
});

export const endSession = (): EndSessionAction => ({
  type: SessionsActionTypes.END_SESSION,
});

export const endAndSaveSession = (): EndAndSaveSessionsThunkAction =>
  async (dispatch, getState) => {
    dispatch(endSession());
    const { sessions } = getState().sessions;
    if (sessions.length) {
      const resp = await fetch(API`/sessions`, {
        credentials: 'include',
        method: 'POST',
        headers: defaultFetchHeaders,
        body: JSON.stringify({ session: sessions[sessions.length - 1] }),
      });
      if (!resp.ok) return console.log('Huh, I couldn\'t save your session. Weird.');
    }
  }
;

export const startSet = (exercise: string): StartSetAction => ({
  type: SessionsActionTypes.START_SET,
  payload: { exercise },
});

export const endSet = (reps: number, weight: number): EndSetAction => ({
  type: SessionsActionTypes.END_SET,
  payload: { reps, weight },
});

export const cancelSet = (): CancelSetAction => ({
  type: SessionsActionTypes.CANCEL_SET,
});
