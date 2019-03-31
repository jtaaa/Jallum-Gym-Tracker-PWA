import { CallHistoryMethodAction } from 'connected-react-router';

export interface AppReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction,
};

export interface AppReduxStateProps {};

export type AppReduxProps = AppReduxStateProps & AppReduxDispatchProps;

export interface AppProps extends AppReduxProps {};

export interface AppState {};
