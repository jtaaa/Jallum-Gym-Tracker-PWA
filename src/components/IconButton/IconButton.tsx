import React, { MouseEvent } from 'react';
import './IconButton.scss';
import { IconButtonProps } from './IconButton.types';

import { ClassSet } from '../../utils';

const Button = ({ icon, outline = 'none', margin = true, stopPropagation = false, handleClick }: IconButtonProps) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (outline !== 'none' || stopPropagation) e.stopPropagation();
    if (handleClick) handleClick(e);
  }; 
  let iconSVG = null;
  switch(icon) {
    case 'add':
      iconSVG = (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="23.25" y="12" width="1.5" height="24" fill="#959595"/>
          <rect x="12" y="23.25" width="24" height="1.5" fill="#959595"/>
        </svg>
      );
      break;
    case 'done':
      iconSVG = (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="38.1003" y="16.3129" width="25.4962" height="1.5" transform="rotate(132.626 38.1003 16.3129)" fill="#959595"/>
          <rect x="11.5159" y="24.7777" width="13.5929" height="1.5" transform="rotate(42.6257 11.5159 24.7777)" fill="#959595"/>
        </svg>
      );
      break;
    case 'minus':
      iconSVG = (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="23.25" width="24" height="1.5" fill="#959595"/>
        </svg>
      );
      break;
    case 'next':
      iconSVG = (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="28.0607" y="11.25" width="18" height="1.5" transform="rotate(45 28.0607 11.25)" fill="#959595"/>
          <rect x="27" y="35.9779" width="18" height="1.5" transform="rotate(-45 27 35.9779)" fill="#959595"/>
          <rect x="7.5" y="23.25" width="31.5" height="1.5" fill="#959595"/>
        </svg>
      );
      break;
    case 'start':
      iconSVG = (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20.5607" y="11.25" width="18" height="1.5" transform="rotate(45 20.5607 11.25)" fill="#959595"/>
          <rect x="19.5" y="35.9779" width="18" height="1.5" transform="rotate(-45 19.5 35.9779)" fill="#959595"/>
        </svg>
      );
      break;
    case 'cancel':
      iconSVG = (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="31.5" stroke="#959595" stroke-dasharray="6 6"/>
          <rect x="42.6066" y="19.9792" width="2" height="32" transform="rotate(45 42.6066 19.9792)" fill="#959595"/>
          <rect x="21.3934" y="19.9792" width="32" height="2" transform="rotate(45 21.3934 19.9792)" fill="#959595"/>
        </svg>
      );
      break;
  }
  return (
    <div
      className={ClassSet`
        dashed: ${outline === 'dashed'}
        margin: ${margin}
        IconButton
      `}
      onClick={onClick}
    >
      { iconSVG }
    </div>
  );
};

export default React.memo(Button);
