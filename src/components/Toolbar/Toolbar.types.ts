import { ActionType } from '../../redux/action.type';

export interface ToolbarProps {
  navigateTo: (route: string) => ActionType;
};
