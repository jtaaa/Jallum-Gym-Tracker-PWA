import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from '../state.types';

export interface Profile {
  _id: string;
  googleId: string;
  dateAdded: Date;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  photos: Array<string>;
  roles: Array<string>;
  sessions: Array<string>;
};

export enum ProfileActionTypes {
  SET_PROFILE = 'SET_PROFILE',
  REFRESH_PROFILE = 'REFRESH_PROFILE',
};

export interface SetProfileAction extends Action {
  type: ProfileActionTypes.SET_PROFILE;
  payload: {
    profile: Profile;
  };
};

export type RefreshProfileThunkAction = ThunkAction<Promise<void>, State, undefined, SetProfileAction>;

export type ProfileAction = SetProfileAction;
