import { MouseEvent } from 'react';

export interface IconButtonProps {
  handleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon: 'add' | 'minus' | 'next' | 'start' | 'done' | 'cancel';
  outline?: 'none' | 'dashed';
  margin?: boolean;
  stopPropagation?: boolean;
};
