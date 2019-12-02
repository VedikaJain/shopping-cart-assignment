import React from 'react';
import './PinkButton.scss';

function PinkButton(props) {
  return (
    <button className='PinkButton' onClick={props.handleClick}>{props.text}</button>
  );
}

export default PinkButton;
