import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as navigateTo } from 'connected-react-router';
import './App.scss';
import { AppProps, AppState, AppReduxDispatchProps, AppReduxStateProps } from './App.types';

import SessionRecorder from './../SessionRecorder/SessionRecorder';
import SessionTracker from './../SessionTracker/SessionTracker';
import Typography from '../../components/Typography/Typography';
import Toolbar from './../../components/Toolbar/Toolbar';
import Platform from './../../components/Platform/Platform';

import { ThunkDispatch } from 'redux-thunk';

import { ActionType } from './../../redux/action.type';
import { State } from './../../redux/state.types';
import { refreshProfile } from './../../redux/profile';

class App extends Component<AppProps, AppState> {
  componentDidMount() {
    this.props.refreshProfile();
  }

  render() {
    return (
      <div className="theme-dark">
        <div className="App">
          <Switch>
            <Route path="/" exact />
            <Route path="/" render={() => <Toolbar navigateTo={this.props.navigateTo} />} />
          </Switch>
          <SessionRecorder />
          { !this.props.isLoggedIn &&
          <Platform>
            <a href="/api/auth/google">
              <div className="App-login">
                <Typography dim>Login</Typography>
              </div>
            </a>
          </Platform>
          }
          <SessionTracker />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: State): AppReduxStateProps => ({
  isLoggedIn: state.profile !== null,
});

const mapDispathToProps = (dispatch: ThunkDispatch<State, undefined, ActionType>): AppReduxDispatchProps => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
  refreshProfile: () => dispatch(refreshProfile()),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(App);
