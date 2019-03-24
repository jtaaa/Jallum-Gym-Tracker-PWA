import React from 'react';
import './Toolbar.scss';

import Logo from './../Logo/Logo';
import { ToolbarProps } from './Toolbar.types';

const Toolbar = ({ navigateTo }: ToolbarProps) => {
  return (
    <div className="Toolbar">
      <Logo size="small" handleClick={() => { navigateTo('/'); } } />
    </div>
  );
};

export default React.memo(Toolbar);
