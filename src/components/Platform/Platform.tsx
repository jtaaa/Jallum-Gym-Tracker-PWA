import React, { FunctionComponent, MouseEvent } from 'react';
import './Platform.scss';
import { PlatformProps } from './Platform.type';

const Platform: FunctionComponent<PlatformProps> = ({ children }) => {
  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();
  return (
    <div onClick={stopPropagation}>
      { children }
    </div>
  );
};

export default React.memo(Platform);
