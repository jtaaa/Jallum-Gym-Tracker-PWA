import { ActionType } from './../../redux/action.type';

export interface AppProps {
  navigateTo: (route: string) => ActionType,
};
