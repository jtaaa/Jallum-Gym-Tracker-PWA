import React, { FunctionComponent } from 'react';
import './ContentCard.scss';
import { ContentCardProps } from './ContentCard.types';

import Platform from './../Platform/Platform';

const ContentCard: FunctionComponent<ContentCardProps> = ({ children }) => {
  return (
    <Platform>
      <div className="ContentCard">
        <div className="ContentCard-display">
          { children[0] }
        </div>
        <div className="ContentCard-caption">
          { children[1] }
        </div>
      </div>
    </Platform>
  );
};

export default React.memo(ContentCard);