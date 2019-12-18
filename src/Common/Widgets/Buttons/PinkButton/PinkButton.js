import React from 'react';
import './PinkButton.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function PinkButton(props) {
  return (
    <button className='PinkButton' onClick={props.handleClick} disabled={props.disabled}
      addontext={props.addontext}>
      <span className={props.icon ? 'pinkBtnText' : ''}>{props.text}</span>
      { props.icon && 
        <ExpandMoreIcon
          alt={props.text} className='pinkBtnIcon'/>
      }
    </button>
  );
}

export default PinkButton;
