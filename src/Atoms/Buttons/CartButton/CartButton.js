import React from 'react';
import './CartButton.scss';
import * as Constants from '../../../global-constants';

function CartButton(props) {
  return (
    <button className='cartbutton' onClick={props.handleClick}
      aria-labelledby='cartbutton__icon' aria-describedby='cartbutton__text'>
      <img src={Constants.UrlPublic + Constants.ImgCartIcon}
        alt={Constants.GoTo + Constants.Cart} className='cartbutton__icon' id='cartbutton__icon' />
      <span id='cartbutton__text'>
        {props.cartItems} {(props.cartItems <= 1) ? Constants.Item : Constants.Item + 's'}
      </span>
    </button>
  );
}

export default CartButton;
