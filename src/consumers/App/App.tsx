import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push as navigateTo } from 'connected-react-router';
import './App.scss';
import { AppProps } from './App.types';

import Toolbar from './../../components/Toolbar/Toolbar';

import { ActionType } from '../../redux/action.type';

class App extends Component<AppProps> {
  render() {
    return (
      <div className="theme-dark">
        <div className="App">
          <Switch>
            <Route path="/" exact />
            <Route path="/" render={() => <Toolbar navigateTo={this.props.navigateTo} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch: Dispatch<ActionType>) => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
});

export default connect(
  null,
  mapDispathToProps
)(App);
