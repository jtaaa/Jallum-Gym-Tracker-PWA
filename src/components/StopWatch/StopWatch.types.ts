export interface StopWatchProps {
  startOnMount?: boolean;
};

export interface StopWatchState {
  startTime?: number,
  endTime?: number,
  elapsed?: number,
  intervalId?: any,
};
