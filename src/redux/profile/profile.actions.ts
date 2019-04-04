import { ProfileActionTypes, Profile, SetProfileAction, RefreshProfileThunkAction } from './profile.types';

import { API } from './../../utils';

export const setProfile = (profile: Profile): SetProfileAction => ({
  type: ProfileActionTypes.SET_PROFILE,
  payload: { profile },
});

export const refreshProfile = (): RefreshProfileThunkAction =>
  async (dispatch) => {
    const resp = await fetch(API`/users`, { credentials: 'include' });
    if (!resp.ok) return console.log('You aren\'t logged in. That\'s okay tho.');
    const profile = await resp.json();
    dispatch(setProfile(profile));
  }
;
