import React from 'react';
import { MouseEvent } from 'react';
import './OptionsList.scss';
import { OptionsListProps } from './OptionsList.types';

import Typography from './../Typography/Typography';

import { ClassSet } from './../../utils';

const OptionsList = ({ options, handleClick = () => {} }: OptionsListProps) => {
  const getClickHandler = (value: string) => (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClick(value);
  };
  return (
    <div className="OptionsList">
      { options.map(option => (
      <div key={option.value} className={ClassSet`selected: ${option.selected} OptionsList-item`}
        onClick={getClickHandler(option.value)}
      >
        <Typography dim={!option.selected}>{ option.value }</Typography>
      </div>
      ))}
    </div>
  );
};

export default React.memo(OptionsList);
