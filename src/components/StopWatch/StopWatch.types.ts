export interface StopWatchProps {
  startOnMount?: boolean;
  clearOnStop?: boolean;
  clearTimout?: number;
};

export interface StopWatchState {
  startTime?: number;
  endTime?: number;
  elapsed?: number;
  intervalId?: any;
};
