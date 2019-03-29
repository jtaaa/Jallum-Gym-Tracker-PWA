import React, { FunctionComponent } from 'react';
import './HorizontalControl.scss';
import { HorizontalControlProps, ControlProps } from './HorizontalControl.types';

import IconButton from './../IconButton/IconButton';

const Control = ({ icon, handleClick }: ControlProps) => {
  return (
    <IconButton icon={icon} handleClick={handleClick} margin={false} stopPropagation />
  );
};

const HorizontalControl: FunctionComponent<HorizontalControlProps> = ({ start, end, children }) => {
  return (
    <div className="HorizontalControl">
      <Control {...start} />
      <div className="HorizontalControl-display">
        { children }
      </div>
      <Control {...end}   />
    </div>
  );
};

export default React.memo(HorizontalControl);

