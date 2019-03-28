import React, { Component } from 'react';
import './StopWatch.scss';
import { StopWatchProps, StopWatchState } from './StopWatch.types';

import Typography from './../Typography/Typography';

class StopWatch extends Component<StopWatchProps, StopWatchState> {
  constructor(props: StopWatchProps) {
    super(props);

    this.state = {};
  
    this.update = this.update.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
  }
  

  componentDidMount() {
    if (this.props.startOnMount) this.start();
  }

  public update() {
    this.setState(state => ({ elapsed: state.startTime ?
        Date.now() - state.startTime
      : state.elapsed
    }));
  }

  public start() {
    const intervalId = setInterval(this.update, 500);
    this.setState({
      startTime: Date.now(),
      elapsed: 0,
      intervalId,
    });
  }

  public stop() {
    clearInterval(this.state.intervalId);
    this.setState({ endTime: Date.now() });
    if (this.props.clearOnStop) {
      setTimeout(() => this.setState({ elapsed: 0 }), this.props.clearTimout || 3000);
    }
  }

  private getMinutes() {
    const hours = this.state.elapsed ?
      (Math.round(this.state.elapsed / 60000))
    : 0;
    return hours.toString().padStart(2, '0');
  }

  private getSeconds() {
    const hours = this.state.elapsed ?
      (Math.round((this.state.elapsed % 60000) / 1000))
    : 0;
    return hours.toString().padStart(2, '0');
  }
  
  render() {
    return (
      <div className="StopWatch">
        <Typography>{ this.getMinutes() }</Typography>
        <Typography>:</Typography>
        <Typography>{ this.getSeconds() }</Typography>
      </div>
    );
  }
};

export default StopWatch;
