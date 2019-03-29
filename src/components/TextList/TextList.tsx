import React, { FunctionComponent } from 'react';
import './TextList.scss';
import { TextListProps } from './TextList.types';

import Typography from './../Typography/Typography';

const TextList: FunctionComponent<TextListProps> = ({ children, renderPrefix }) => {
  return (
    <div className="TextList">
      { children && children.map((child, index) => (
        <div key={index} className="TextList-item">
          { renderPrefix && 
          <div className="TextList-prefix">
            <Typography dim small>{ renderPrefix(index) }</Typography>
          </div>
          }
          <div className="TextList-text">
            <Typography dim small>{ child }</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextList;
