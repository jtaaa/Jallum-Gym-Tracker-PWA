import { MouseEvent } from 'react';

export interface LogoProps {
  handleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  size?: 'small' | 'regular';
};
