import { PropsWithChildren } from 'react';

export interface ControlProps {
  icon: 'add' | 'minus';
  handleClick: () => void;
};

export type HorizontalControlProps = PropsWithChildren<{
  start: ControlProps;
  end: ControlProps;
}>;
