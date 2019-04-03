import React from 'react';
import { MouseEvent } from 'react';
import './OptionsList.scss';
import { OptionsListProps, OptionsListOption } from './OptionsList.types';

import Typography from './../Typography/Typography';

import { ClassSet } from './../../utils';

const OptionsList = ({ options, handleClick }: OptionsListProps) => {
  const getClickHandler = (option: OptionsListOption) => (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (handleClick) handleClick(option);
  };
  return (
    <div className="OptionsList">
      { options.map(option => (
      <div 
        key={option.value}
        className={ClassSet`
          selected: ${option.selected}
          highlighted: ${option.highlighted || false}
          clickable: ${handleClick !== undefined}
          OptionsList-item
        `}
        onClick={getClickHandler(option)}
      >
        <Typography dim={!option.selected && !option.highlighted}>{ option.value }</Typography>
      </div>
      ))}
    </div>
  );
};

export default React.memo(OptionsList);
