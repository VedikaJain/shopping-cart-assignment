import React from 'react';
import './GreyButton.scss';

function GreyButton(props) {
  return (
    <button className='greybutton' onClick={props.handleClick}
      aria-label={props.ariaLabel} aria-controls={props.ariaControls}>
      {props.text}
    </button>
  );
}

export default GreyButton;
