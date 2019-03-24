import React from 'react';
import './Typography.scss';
import { TypographyProps } from './Typography.types';

import { ClassSet } from './../../utils';

const Typography = ({ dim = false, children }: TypographyProps) => {
  return (
    <div className={ClassSet`dim: ${dim} Typography`}>
      { children }
    </div>
  );
};

export default React.memo(Typography);
