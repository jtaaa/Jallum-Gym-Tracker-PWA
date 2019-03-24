import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push as navigateTo } from 'connected-react-router';
import './App.scss';
import { AppProps, AppState } from './App.types';

import Toolbar from './../../components/Toolbar/Toolbar';
import Logo from './../../components/Logo/Logo';
import Typography from './../../components/Typography/Typography';
import IconButton from './../../components/IconButton/IconButton';

import { ActionType } from './../../redux/action.type';
import { startSession } from '../../redux/sessions';
import { State } from '../../redux/state.types';

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  
    this.state = {
      muscleGroups: [],
      reps: 8,
      weight: 30,
    };

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }
  
  handleBackgroundClick() {
    switch(this.props.location.pathname) {
      case '/':
        return this.props.navigateTo('/exercise');
    }
  }

  render() {
    return (
      <div className="theme-dark">
        <div className="App" onClick={this.handleBackgroundClick}>
          <Switch>
            <Route path="/" exact />
            <Route path="/" render={() => <Toolbar navigateTo={this.props.navigateTo} />} />
          </Switch>
          <div className="App-content">
            <Switch>
              <Route path="/" render={() => (
                <div>
                  <div className="App-logo-wrapper">
                    <Logo />
                  </div>
                  <Typography dim={true}>Start Gym Session</Typography>
                  <IconButton icon="add" />
                </div>
              )} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const mapDispathToProps = (dispatch: Dispatch<ActionType>) => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
  startSession: (muscleGroups: Array<string>) => dispatch(startSession(muscleGroups)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(App);
