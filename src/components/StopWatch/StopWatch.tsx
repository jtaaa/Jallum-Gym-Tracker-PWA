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

  private refreshIntervalId: any;
  private clearTimeoutId: any;
  

  componentDidMount() {
    if (this.props.startOnMount) this.start();
  }

  componentWillUnmount() {
    if (this.refreshIntervalId) clearInterval(this.refreshIntervalId);
    if (this.clearTimeoutId) clearTimeout(this.clearTimeoutId);
  }

  public update() {
    this.setState(state => ({ elapsed: state.startTime ?
        Date.now() - state.startTime
      : state.elapsed
    }));
  }

  public start() {
    this.refreshIntervalId = setInterval(this.update, 500);
    this.setState({
      startTime: Date.now(),
      elapsed: 0,
    });
  }

  public stop() {
    clearInterval(this.refreshIntervalId);
    this.setState({ endTime: Date.now() });
    if (this.props.clearOnStop) {
      this.clearTimeoutId = setTimeout(() => this.setState({ elapsed: 0 }), this.props.clearTimout || 3000);
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
