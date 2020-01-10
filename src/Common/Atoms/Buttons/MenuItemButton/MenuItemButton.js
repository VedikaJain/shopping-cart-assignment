import React from 'react';
import './MenuItemButton.scss';
import Hr from '../../HorizontalRow/Hr';

function MenuItemButton(props) {
  return (
    <button className={'menuitembutton' + (props.selected ? ' menuitembutton-selected' : '')}
      role='tab' aria-label={props.text}
      aria-controls={props.ariaControls}
      aria-selected={props.selected}
      onClick={props.handleClick}>
      <p className={props.selected ? 'menuitembutton-selected-text' : ''}>
        {props.text}
      </p>
      <Hr type='hr-grey-solid' />
    </button>
  );
}

export default MenuItemButton;
