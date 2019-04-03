import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as navigateTo } from 'connected-react-router';
import './SessionRecorder.scss';
import { SessionRecorderProps, SessionRecorderState, SessionRecorderReduxStateProps, SessionRecorderReduxDispatchProps, SessionRecorderOptionsListOption } from './SessionRecorder.types';

import Logo from './../../components/Logo/Logo';
import Typography from './../../components/Typography/Typography';
import IconButton from './../../components/IconButton/IconButton';
import OptionsList from './../../components/OptionsList/OptionsList';
import StopWatch from './../../components/StopWatch/StopWatch';
import HorizontalControl from './../../components/HorizontalControl/HorizontalControl';
import TextList from './../../components/TextList/TextList';
import TextInput from './../../components/TextInput/TextInput';

import { ThunkDispatch } from 'redux-thunk';

import { ActionType } from './../../redux/action.type';
import { startSession, startSet, endSet, endAndSaveSession, refreshSessions } from './../../redux/sessions';
import { State } from './../../redux/state.types';
import { Exercise, refreshExercises, addExercise, ExercisePartial } from './../../redux/exercises';

class SessionRecorder extends Component<SessionRecorderProps, SessionRecorderState> {
  constructor(props: SessionRecorderProps) {
    super(props);
  
    this.state = {
      reps: 8,
      weight: 30,
      sessionMuscleGroupOptions: [
        { selected: false, value: 'Shoulders' },
        { selected: false, value: 'Legs' },
        { selected: false, value: 'Back' },
        { selected: false, value: 'Chest' },
        { selected: false, value: 'Biceps' },
        { selected: false, value: 'Triceps' },
        { selected: false, value: 'Abs' },
      ],
      newExerciseMuscleGroupOptions: [
        { selected: false, highlighted: false, value: 'Shoulders' },
        { selected: false, highlighted: false, value: 'Legs' },
        { selected: false, highlighted: false, value: 'Back' },
        { selected: false, highlighted: false, value: 'Chest' },
        { selected: false, highlighted: false, value: 'Biceps' },
        { selected: false, highlighted: false, value: 'Triceps' },
        { selected: false, highlighted: false, value: 'Abs' },
      ],
      inSet: false,
      weightUnit: 5,
      repsUnit: 1,
      setSummaries: [],
      newExercise: '',
    };

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.handleOptionsListItemClick = this.handleOptionsListItemClick.bind(this);
    this.increaseReps = this.increaseReps.bind(this);
    this.decreaseReps = this.decreaseReps.bind(this);
    this.increaseWeight = this.increaseWeight.bind(this);
    this.decreaseWeight = this.decreaseWeight.bind(this);
    this.nextExercise = this.nextExercise.bind(this);
    this.completeSession = this.completeSession.bind(this);
    this.newExercise = this.newExercise.bind(this);
    this.updateNewExercise = this.updateNewExercise.bind(this);
    this.cancelNewExercise = this.cancelNewExercise.bind(this);
    this.addNewExercise = this.addNewExercise.bind(this);
  }

  private setsStopWatchRef = React.createRef<StopWatch>();

  componentDidMount() {
    this.props.refreshExercises();
    this.props.refreshSessions();
  }
  
  handleBackgroundClick() {
    switch(this.props.location.pathname) {
      case '/':
        return this.props.navigateTo('/musclegroups');
      case '/musclegroups':
        const muscleGroups = this.state.sessionMuscleGroupOptions.filter(mgo => mgo.selected).map(mgo => mgo.value);
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
              if (this.state.exercise)
                this.props.startSet(this.state.exercise._id);
              this.setState({ inSet: true });
            } else {
              node.stop();
              this.props.endSet(this.state.reps, this.state.weight);
              this.setState(state => ({
                inSet: false,
                setSummaries: [ ...state.setSummaries,
                  `${this.state.reps} reps at ${this.state.weight}lbs`
                ],
              }));
            }
          }
        }
    }
  }

  handleOptionsListItemClick(option: SessionRecorderOptionsListOption) { 
    switch(this.props.location.pathname) {
      case '/musclegroups':
        return this.setState(state => ({
          sessionMuscleGroupOptions: state.sessionMuscleGroupOptions.map(mgo => ({
            value: mgo.value,
            selected: mgo.value === option.value ? !mgo.selected : mgo.selected,
          })),
        }));
      case '/exercise':
        option.extra && this.setState({ exercise: option.extra });
        return this.props.navigateTo('/sets');
      case '/exercise/add':
        return this.setState(state => ({
          newExerciseMuscleGroupOptions: state.newExerciseMuscleGroupOptions.map(mgo => ({
            value: mgo.value,
            selected: mgo.value === option.value ? !mgo.selected && !mgo.highlighted : mgo.selected,
            highlighted: mgo.value === option.value ? mgo.selected && !mgo.highlighted : mgo.highlighted,
          })),
        }));
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

  renderSetPrefix(index: number) {
    return `Set ${index + 1}: `;
  }

  nextExercise() {
    if (!this.state.inSet) {
      this.setState({ setSummaries: [], inSet: false, exercise: undefined }, () =>
        this.props.navigateTo('/exercise'));
    }
  }

  completeSession() {
    this.props.endSession();
    this.props.navigateTo('/');
  }

  newExercise() {
    this.props.navigateTo('/exercise/add');
  }

  updateNewExercise(newExercise: string) {
    this.setState({ newExercise });
  }

  async addNewExercise() {
    if (this.state.newExercise) {
      await this.props.addExercise({
        name: this.state.newExercise,
        primaryMuscleGroups: this.state.newExerciseMuscleGroupOptions.filter(mgo => mgo.selected).map(mgo => mgo.value),
        secondaryMuscleGroups: this.state.newExerciseMuscleGroupOptions.filter(mgo => mgo.highlighted).map(mgo => mgo.value),
      });
      this.props.navigateTo('/exercise');
    }
  }

  cancelNewExercise() {
    this.props.navigateTo('/exercise');
  }

  render() {
    return (
      <div className="SessionRecorder" onClick={this.handleBackgroundClick}>
        <div className="SessionRecorder-content">
          <Switch>
            <Route path="/exercise/add" render={() => (
              <div>
                <div className="SessionRecorder-heading">
                  <Typography dim={true}>New Exercise</Typography>
                </div>
                <TextInput value={this.state.newExercise} onChange={this.updateNewExercise} autoFocus />
                <div className="SessionRecorder-heading">
                  <Typography dim={true}>Muscle Groups</Typography>
                  <Typography dim={true} small>(double-click for secondary)</Typography>
                </div>
                <OptionsList options={this.state.newExerciseMuscleGroupOptions} handleClick={this.handleOptionsListItemClick}/>
                <div className="SessionRecorder-button-list">
                  { this.state.newExercise &&
                  <IconButton icon="done" outline="dashed" handleClick={this.addNewExercise} />
                  }
                  <IconButton icon="cancel" outline="dashed" handleClick={this.cancelNewExercise} />
                </div>
              </div>
            )} />            
            <Route path="/sets" render={() => (
              <div>
                <div className="SessionRecorder-heading">
                  <Typography dim={true}>
                    { this.state.exercise ? this.state.exercise.name : 'Go pick an exercise!' }
                  </Typography>
                </div>
                { !this.state.inSet ?
                  <IconButton icon="start" />
                : <IconButton icon="done" /> }
                <div className="SessionRecorder-sets-stopwatch">
                  <StopWatch ref={this.setsStopWatchRef} clearOnStop />
                </div>
                <div className="SessionRecorder-number-input">
                  <Typography dim small>reps</Typography>
                  <div className="SessionRecorder-number-input-control">
                    <HorizontalControl
                      start={{ icon: 'minus', handleClick: this.decreaseReps }}
                      end={{ icon: 'add', handleClick: this.increaseReps }}
                    >
                      { this.state.reps }
                    </HorizontalControl>
                  </div>
                </div>
                <div className="SessionRecorder-number-input">
                  <Typography dim small>weight</Typography>
                  <div className="SessionRecorder-number-input-control">
                    <HorizontalControl
                      start={{ icon: 'minus', handleClick: this.decreaseWeight }}
                      end={{ icon: 'add', handleClick: this.increaseWeight }}
                    >
                      { this.state.weight }
                    </HorizontalControl>
                  </div>
                </div>
                <div className="SessionRecorder-sets-list">
                  <TextList renderPrefix={this.renderSetPrefix} limit={5}>
                    { this.state.setSummaries }
                  </TextList>
                </div>
                { !this.state.inSet &&
                <IconButton icon="done" outline="dashed" handleClick={this.nextExercise} />
                }
              </div>
            )} />
            <Route path="/exercise" render={() => (
              <div>
                <div className="SessionRecorder-heading">
                  <Typography dim={true}>Exercise</Typography>
                </div>
                <OptionsList options={this.props.exerciseOptions} handleClick={this.handleOptionsListItemClick}/>
                <div className="SessionRecorder-button-list">
                  <IconButton icon="done" outline="dashed" handleClick={this.completeSession} />
                  <IconButton icon="add" outline="dashed" handleClick={this.newExercise} />
                  <IconButton icon="next" />
                </div>
              </div>
            )} />
            <Route path="/musclegroups" render={() => (
              <div>
                <div className="SessionRecorder-heading">
                  <Typography dim={true}>Muscle Groups</Typography>
                </div>
                <OptionsList options={this.state.sessionMuscleGroupOptions} handleClick={this.handleOptionsListItemClick}/>
                <IconButton icon="next" />
              </div>
            )} />
            <Route path="/" render={() => (
              <div>
                <div className="SessionRecorder-logo">
                  <Logo />
                </div>
                <Typography dim={true}>Start Gym Session</Typography>
                <IconButton icon="add" />
              </div>
            )} />
          </Switch>
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

const mapStateToProps = (state: State): SessionRecorderReduxStateProps => ({
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

const mapDispathToProps = (dispatch: ThunkDispatch<State, undefined, ActionType>): SessionRecorderReduxDispatchProps => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
  startSession: (muscleGroups: Array<string>) => dispatch(startSession(muscleGroups)),
  endSession: () => dispatch(endAndSaveSession()),
  startSet: (exercise: string) => dispatch(startSet(exercise)),
  endSet: (reps: number, weight: number) => dispatch(endSet(reps, weight)),
  refreshExercises: () => dispatch(refreshExercises()),
  refreshSessions: () => dispatch(refreshSessions()),
  addExercise: (exercise: ExercisePartial) => dispatch(addExercise(exercise))
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(SessionRecorder);
