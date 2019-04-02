import { CallHistoryMethodAction } from 'connected-react-router';

export interface AppReduxDispatchProps {
  navigateTo: (route: string) => CallHistoryMethodAction;
  refreshProfile: () => Promise<void>;
};

export interface AppReduxStateProps {
  isLoggedIn: boolean,
};

export type AppReduxProps = AppReduxStateProps & AppReduxDispatchProps;

export interface AppProps extends AppReduxProps {};

export interface AppState {};
