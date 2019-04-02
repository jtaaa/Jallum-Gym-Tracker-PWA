import { ProfileAction, ProfileActionTypes, Profile } from './profile.types';

export const profileReducer = (state: Profile | null = null, action: ProfileAction): Profile | null => {
  switch(action.type) {
    case ProfileActionTypes.SET_PROFILE:
      return ({
        ...action.payload.profile,
      });
    default:
      return state;
  };
};
