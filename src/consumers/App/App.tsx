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
import OptionsList from './../../components/OptionsList/OptionsList';

import { ActionType } from './../../redux/action.type';
import { startSession } from '../../redux/sessions';
import { State } from '../../redux/state.types';

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  
    this.state = {
      reps: 8,
      weight: 30,
      muscleGroupOptions: [
        { selected: false, value: 'Shoulders' },
        { selected: false, value: 'Legs' },
        { selected: false, value: 'Back' },
        { selected: false, value: 'Chest' },
        { selected: false, value: 'Biceps' },
        { selected: false, value: 'Triceps' },
        { selected: false, value: 'Abs' },
      ],
    };

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.handleOptionsListItemClick = this.handleOptionsListItemClick.bind(this);
  }
  
  handleBackgroundClick() {
    switch(this.props.location.pathname) {
      case '/':
        return this.props.navigateTo('/musclegroups');
      case '/musclegroups':
        const muscleGroups = this.state.muscleGroupOptions.filter(mgo => mgo.selected).map(mgo => mgo.value);
        if (!muscleGroups.length) return;
        this.props.startSession(muscleGroups);
        return this.props.navigateTo('/exercise');
    }
  }

  handleOptionsListItemClick(value: string) { 
    switch(this.props.location.pathname) {
      case '/musclegroups':
        return this.setState(state => ({
          muscleGroupOptions: state.muscleGroupOptions.map(mgo => ({
            value: mgo.value,
            selected: mgo.value === value ? !mgo.selected : mgo.selected,
          })),
        }));
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
              <Route path="/musclegroups" render={() => (
                <div>
                  <div className="App-heading-wrapper">
                    <Typography dim={true}>Muscle Groups</Typography>
                  </div>
                  <OptionsList options={this.state.muscleGroupOptions} handleClick={this.handleOptionsListItemClick}/>
                  <IconButton icon="next" />
                </div>
              )} />
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
