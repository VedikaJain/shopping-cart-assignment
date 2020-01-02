import React from 'react';
import './IconButton.scss';
import MenuIcon from '@material-ui/icons/Menu';

function IconButton(props) {
  return (
    <button className='iconbutton'
      aria-label={props.ariaLabel} aria-controls={props.ariaControls} aria-haspopup={props.ariaHaspopup}
      onClick={props.handleClick}>
      <MenuIcon alt={props.text}/>
    </button>
  );
}

export default IconButton;
