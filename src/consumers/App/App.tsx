import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as navigateTo } from 'connected-react-router';
import './App.scss';
import { AppProps, AppState, AppReduxDispatchProps } from './App.types';

import SessionRecorder from './../SessionRecorder/SessionRecorder';
import Toolbar from './../../components/Toolbar/Toolbar';

import { ThunkDispatch } from 'redux-thunk';

import { ActionType } from './../../redux/action.type';
import { State } from './../../redux/state.types';

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div className="theme-dark">
        <div className="App">
          <Switch>
            <Route path="/" exact />
            <Route path="/" render={() => <Toolbar navigateTo={this.props.navigateTo} />} />
          </Switch>
          <SessionRecorder />
        </div>
      </div>
    );
  }
};

const mapDispathToProps = (dispatch: ThunkDispatch<State, undefined, ActionType>): AppReduxDispatchProps => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
});

export default connect(
  null,
  mapDispathToProps,
)(App);
