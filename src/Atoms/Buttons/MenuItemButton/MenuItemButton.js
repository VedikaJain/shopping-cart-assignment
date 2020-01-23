import React from 'react';
import './MenuItemButton.scss';
import Hr from '../../HorizontalRow/Hr';

function MenuItemButton(props) {
  return (
    <button className={'menuitembutton' + (props.selected ? ' menuitembutton--selected' : '')}
      role='tab'
      aria-controls={props.ariaControls}
      aria-selected={props.selected}
      onClick={props.handleClick}>
      <p className={'menuitembutton__text' + (props.selected ? ' menuitembutton__text--selected' : '')}>
        {props.text}
      </p>
      <Hr type='hr--grey-solid' />
    </button>
  );
}

export default MenuItemButton;
