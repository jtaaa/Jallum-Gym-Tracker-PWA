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
import StopWatch from './../../components/StopWatch/StopWatch';
import HorizontalControl from './../../components/HorizontalControl/HorizontalControl';

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
      inSet: false,
      weightUnit: 5,
      repsUnit: 1,
    };

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.handleOptionsListItemClick = this.handleOptionsListItemClick.bind(this);
    this.increaseReps = this.increaseReps.bind(this);
    this.decreaseReps = this.decreaseReps.bind(this);
    this.increaseWeight = this.increaseWeight.bind(this);
    this.decreaseWeight = this.decreaseWeight.bind(this);
  }

  private setsStopWatchRef = React.createRef<StopWatch>();

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
      case '/sets':
        if (this.setsStopWatchRef) {
          const node = this.setsStopWatchRef.current;
          if (node) {
            if (!this.state.inSet) {
              node.start();
              this.setState({ inSet: true });
            } else {
              node.stop();
              this.setState({ inSet: false });
            }
          }
        }
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

  increaseReps() {
    this.setState(state => ({ reps: state.reps + this.state.repsUnit }));
  }
  decreaseReps() {
    this.setState(state => ({ reps: state.reps - this.state.repsUnit }));
  }

  increaseWeight() {
    this.setState(state => ({ weight: state.weight + this.state.weightUnit }));
  }
  decreaseWeight() {
    this.setState(state => ({ weight: state.weight - this.state.weightUnit }));
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
              <Route path="/sets" render={() => (
                <div>
                  <div className="App-heading">
                    <Typography dim={true}>
                      { this.state.exercise ? this.state.exercise.name : 'Go pick an exercise!' }
                    </Typography>
                  </div>
                  { !this.state.inSet ?
                    <IconButton icon="start" />
                  : <IconButton icon="done" /> }
                  <div className="App-sets-stopwatch">
                    <StopWatch ref={this.setsStopWatchRef} clearOnStop />
                  </div>
                  <div className="App-number-input">
                    <Typography dim small>reps</Typography>
                    <div className="App-number-input-control">
                      <HorizontalControl
                        start={{ icon: 'minus', handleClick: this.decreaseReps }}
                        end={{ icon: 'add', handleClick: this.increaseReps }}
                      >
                        { this.state.reps }
                      </HorizontalControl>
                    </div>
                  </div>
                  <div className="App-number-input">
                    <Typography dim small>weight</Typography>
                    <div className="App-number-input-control">
                      <HorizontalControl
                        start={{ icon: 'minus', handleClick: this.decreaseWeight }}
                        end={{ icon: 'add', handleClick: this.increaseWeight }}
                      >
                        { this.state.weight }
                      </HorizontalControl>
                    </div>
                  </div>
                </div>
              )} />
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
