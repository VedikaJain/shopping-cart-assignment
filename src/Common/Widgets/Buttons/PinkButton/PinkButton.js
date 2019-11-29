import React from 'react';
import './PinkButton.scss';

function PinkButton(props) {
  return (
    <button className='set-pink-btn'>{props.text}</button>
  );
}

export default PinkButton;
