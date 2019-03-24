import { CallHistoryMethodAction } from 'connected-react-router';

export interface ToolbarProps {
  navigateTo: (route: string) => CallHistoryMethodAction;
};
