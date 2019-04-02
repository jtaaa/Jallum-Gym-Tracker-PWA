import React, { Component } from 'react';
import { push as navigateTo } from 'connected-react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './SessionTracker.scss';
import { SessionTrackerProps, SessionTrackerState, SessionTrackerReduxStateProps, SessionTrackerReduxDispatchProps } from './SessionTracker.types';

import { State } from './../../redux/state.types';
import { ActionType } from './../../redux/action.type';
import ContentCard from '../../components/ContentCard/ContentCard';
import SessionsPerWeekCard from '../../components/ContentCard/SessionsPerWeekCard/SessionsPerWeekCard';

class SessionTracker extends Component<SessionTrackerProps, SessionTrackerState> {
  private getPanelIndex() {
    try {
      const query: { [name: string]: string } = this.props.location.search.slice(1).split('&').reduce((acc, cur) => {
        const [ name, value ] = cur.split('=');
        return ({ ...acc, [name]: value });
      }, {});
      return query['panel'];
    } catch (err) {
      console.warn('You\'ve got an invalid query string there bro.');
      return '';
    }
  }

  private getSpotlight() {
    const panelIndex = this.getPanelIndex();
    switch(panelIndex) {
      case '1':
      default:
        return <SessionsPerWeekCard sessions={this.props.sessions} />
    }
  }

  render() {
    return (
      <div className="SessionTracker">
        <div className="SessionTracker-spotlight">
          { this.getSpotlight() }
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state: State): SessionTrackerReduxStateProps => ({
  location: state.router.location,
  sessions: state.sessions.sessions, 
});

const mapDispathToProps = (dispatch: ThunkDispatch<State, undefined, ActionType>): SessionTrackerReduxDispatchProps => ({
  navigateTo: (route: string) => dispatch(navigateTo(route)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(SessionTracker);
