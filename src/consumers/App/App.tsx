import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as navigateTo } from 'connected-react-router';
import './App.scss';
import { AppProps, AppState, AppReduxStateProps, AppReduxDispatchProps, AppOptionsListOption } from './App.types';

import Toolbar from './../../components/Toolbar/Toolbar';
import Logo from './../../components/Logo/Logo';
import Typography from './../../components/Typography/Typography';
import IconButton from './../../components/IconButton/IconButton';
import OptionsList from './../../components/OptionsList/OptionsList';

import { ThunkDispatch } from 'redux-thunk';

import { ActionType } from './../../redux/action.type';
import { startSession } from './../../redux/sessions';
import { State } from './../../redux/state.types';
import { Exercise, refreshExercises } from './../../redux/exercises';

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

  componentDidMount() {
    this.props.refreshExercises();
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
      case '/exercise':
        return this.props.exerciseOptions[0] && 
          this.handleOptionsListItemClick(this.props.exerciseOptions[0]);
    }
  }

  handleOptionsListItemClick(option: AppOptionsListOption) { 
    switch(this.props.location.pathname) {
      case '/musclegroups':
        return this.setState(state => ({
          muscleGroupOptions: state.muscleGroupOptions.map(mgo => ({
            value: mgo.value,
            selected: mgo.value === option.value ? !mgo.selected : mgo.selected,
          })),
        }));
      case '/exercise':
        option.extra && this.setState({ exercise: option.extra });
        return this.props.navigateTo('/sets');
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
              <Route path="/exercise" render={() => (
                <div>
                  <div className="App-heading-wrapper">
                    <Typography dim={true}>Exercise</Typography>
                  </div>
                  <OptionsList options={this.props.exerciseOptions} handleClick={this.handleOptionsListItemClick}/>
                  <div className="App-button-list">
                    <IconButton icon="done" outline="dashed" />
                    <IconButton icon="add" outline="dashed" />
                    <IconButton icon="next" />
                  </div>
                </div>
              )} />
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

const includesMuscleGroup = (exercise: Exercise, muscleGroups: Array<string> = []) => {
  let returnVal = false;
  muscleGroups.forEach(mg => {
    if (exercise.primaryMuscleGroups.includes(mg)) return returnVal = true;
  });
  return returnVal;
};

const mapStateToProps = (state: State): AppReduxStateProps => ({
  location: state.router.location,
  exerciseOptions: state.exercises
    .filter(exercise => state.sessions.currentSession &&
                        includesMuscleGroup(exercise, state.sessions.currentSession.muscleGroups))
    .map(exercise => ({
      selected: false,
      value: exercise.name,
      extra: exercise,
    })),
});

const mapDispathToProps = (dispatch: ThunkDispatch<State, undefined, ActionType>): AppReduxDispatchProps => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
  startSession: (muscleGroups: Array<string>) => dispatch(startSession(muscleGroups)),
  refreshExercises: () => dispatch(refreshExercises()),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(App);
