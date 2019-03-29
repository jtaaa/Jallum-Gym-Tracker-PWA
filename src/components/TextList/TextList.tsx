import React, { FunctionComponent } from 'react';
import './TextList.scss';
import { TextListProps } from './TextList.types';

import Typography from './../Typography/Typography';

const TextList: FunctionComponent<TextListProps> = ({ children, limit = 100, renderPrefix }) => {
  let texts = children;
  if (children.length > limit) texts = children.slice(children.length - limit);
  return (
    <div className="TextList">
      { texts && texts.map((child, index) => (
        <div key={index} className="TextList-item">
          { renderPrefix && 
          <div className="TextList-prefix">
            <Typography dim small>
              { renderPrefix(children.length > limit ?
                    (children.length - limit + index)
                  : index) }
            </Typography>
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
