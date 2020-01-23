import React from 'react';
import './Dots.scss';
import LensIcon from '@material-ui/icons/Lens';
import * as Constants from '../../../global-constants';

function Dots(props) {
  return (
    [...new Array(props.totalDots)].map((_, index) => 
      <button className='dots' key={index} onClick={() => props.selectDot(index)}
        aria-label={(index + 1) + Constants.Of + props.totalDots + props.altText}>
        <LensIcon className={'dots__icon ' + (props.activeDot === index ? 'dots__icon--active' : '')}/>
      </button>
    )
  );
}

export default Dots;
