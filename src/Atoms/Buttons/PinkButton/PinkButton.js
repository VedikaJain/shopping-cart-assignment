import React from 'react';
import './PinkButton.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Constants from '../../../global-constants';

function PinkButton(props) {
  return (
    <button disabled={props.disabled} type={props.type}
      aria-label={props.ariaLabel} aria-controls={props.ariaControls} aria-haspopup={props.ariaHaspopup}
      className={(props.className ? props.className + ' ' : '') + 'pinkbutton '
        + (props.rightContent ? 'pinkbutton--space-between' : 'pinkbutton--center')}
      onClick={props.handleClick}
      onFocus={props.handleFocus}>
      <span className='pinkbutton__text'>{props.text}</span>
      { props.rightContent && 
        ((props.rightContent === Constants.IconDownArrow)
          ? <ExpandMoreIcon className='pinkbutton__icon'/>
          : <span className='pinkbutton__text'>{props.rightContent}</span>)
      }
    </button>
  );
}

export default PinkButton;
