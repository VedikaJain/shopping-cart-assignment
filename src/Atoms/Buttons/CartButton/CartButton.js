import React from 'react';
import './CartButton.scss';
import * as Constants from '../../../global-constants';

function CartButton(props) {
  return (
    <button className='cartbutton' onClick={props.handleClick}
      aria-labelledby='cartIcon' aria-describedby='cartItems'>
      <img src={Constants.UrlPublic + Constants.ImgCartIcon}
        alt={Constants.GoTo + Constants.Cart} className='cartbutton-icon' id='cartIcon' />
      <span id='cartItems'>
        {props.cartItems} {(props.cartItems <= 1) ? Constants.Item : Constants.Item + 's'}
      </span>
    </button>
  );
}

export default CartButton;
