import React from 'react';
import './MenuButton.scss';
import MenuIcon from '@material-ui/icons/Menu';

function MenuButton(props) {
  return (
    <button className='menubutton'
      aria-label={props.ariaLabel} aria-controls={props.ariaControls} aria-haspopup={props.ariaHaspopup}
      onClick={props.handleClick}>
      <MenuIcon alt={props.text}/>
    </button>
  );
}

export default MenuButton;
