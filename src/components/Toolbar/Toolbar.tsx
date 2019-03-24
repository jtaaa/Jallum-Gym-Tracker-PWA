import React from 'react';
import './Toolbar.scss';
import { ToolbarProps } from './Toolbar.types';

import Logo from './../Logo/Logo';

const Toolbar = ({ navigateTo }: ToolbarProps) => {
  return (
    <div className="Toolbar">
      <Logo size="small" handleClick={() => { navigateTo('/'); } } />
    </div>
  );
};

export default React.memo(Toolbar);
