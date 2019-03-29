import React, { FunctionComponent } from 'react';
import './Typography.scss';
import { TypographyProps } from './Typography.types';

import { ClassSet } from './../../utils';

const Typography: FunctionComponent<TypographyProps> = ({ dim = false, small = false, children }) => {
  return (
    <div className={ClassSet`
      dim: ${dim}
      small: ${small}
      Typography`
    }>
      { children }
    </div>
  );
};

export default React.memo(Typography);
