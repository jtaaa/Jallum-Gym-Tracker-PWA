import React, { MouseEvent } from 'react';
import './Logo.scss';
import { LogoProps } from './Logo.types';

import { ClassSet } from '../../utils';

const Logo = ({ size = 'regular', handleClick }: LogoProps) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (handleClick) handleClick(e);
  };
  let LogoSVG = null;
  switch(size) {
    case 'small':
      LogoSVG = (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="white"/>
          <rect x="9.68188" y="15.7145" width="12" height="4" transform="rotate(-15.8474 9.68188 15.7145)" fill="#313131"/>
          <rect x="20.6145" y="8.45306" width="4" height="12" rx="1" transform="rotate(-15.8473 20.6145 8.45306)" fill="#313131"/>
          <rect x="4.26062" y="13.0953" width="4" height="12" rx="1" transform="rotate(-15.8474 4.26062 13.0953)" fill="#313131"/>
          <rect x="2.53833" y="16.183" width="2" height="6.5" rx="1" transform="rotate(-15.8474 2.53833 16.183)" fill="#313131"/>
          <rect x="25.6262" y="9.62921" width="2" height="6.5" rx="1" transform="rotate(-15.8474 25.6262 9.62921)" fill="#313131"/>
        </svg>
      );
      break;
    default:
      LogoSVG = (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="white"/>
          <rect x="19.3638" y="31.4289" width="24" height="8" transform="rotate(-15.8474 19.3638 31.4289)" fill="#313131"/>
          <rect x="41.229" y="16.9061" width="8" height="24" rx="1" transform="rotate(-15.8474 41.229 16.9061)" fill="#313131"/>
          <rect x="8.52125" y="26.1907" width="8" height="24" rx="1" transform="rotate(-15.8474 8.52125 26.1907)" fill="#313131"/>
          <rect x="5.07666" y="32.366" width="4" height="13" rx="1" transform="rotate(-15.8474 5.07666 32.366)" fill="#313131"/>
          <rect x="51.2523" y="19.2584" width="4" height="13" rx="1" transform="rotate(-15.8474 51.2523 19.2584)" fill="#313131"/>
        </svg>
      );
      break;
  }
  return (
    <div className={ClassSet`link: ${handleClick !== undefined} Logo`} onClick={onClick}>
      { LogoSVG }
    </div>
  );
};

export default React.memo(Logo);
