import React from 'react';
import './IconButton.scss';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function IconButton(props) {
  return (
    <button className='iconbutton'
      aria-label={props.ariaLabel} aria-controls={props.ariaControls} aria-haspopup={props.ariaHaspopup}
      onClick={props.handleClick}>
      {props.type === 'menu' && <MenuIcon alt={props.ariaLabel} />}
      {props.type === 'close' && <CloseIcon alt={props.ariaLabel} />}
    </button>
  );
}

export default IconButton;
