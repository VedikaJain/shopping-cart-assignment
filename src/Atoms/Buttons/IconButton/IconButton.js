import React from 'react';
import './IconButton.scss';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import * as Constants from '../../../global-constants';

function IconButton(props) {
  return (
    <button className='iconbutton'
      aria-label={props.ariaLabel} aria-controls={props.ariaControls} aria-haspopup={props.ariaHaspopup}
      onClick={props.handleClick} tabIndex={props.tabIndex || 0}>
      {props.type === Constants.IconMenu && <MenuIcon alt={props.ariaLabel} />}
      {props.type === Constants.IconClose && <CloseIcon alt={props.ariaLabel} />}
    </button>
  );
}

export default IconButton;
