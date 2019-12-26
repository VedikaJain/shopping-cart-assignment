import React from 'react';
import './PinkButton.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function PinkButton(props) {
  return (
    <button disabled={props.disabled}
      className={'PinkButton ' + (props.rightContent ? 'pinkbutton-content-side' : 'pinkbutton-content-center')}
      onClick={props.handleClick}
      addontext={props.addontext}>
      <span className='pinkbutton-text'>{props.text}</span>
      { props.rightContent && 
        ((props.rightContent === 'downArrowIcon')
          ? <ExpandMoreIcon alt={props.text} className='pinkbutton-icon'/>
          : <span className='pinkbutton-text'>{props.rightContent}</span>)
      }
    </button>
  );
}

export default PinkButton;
