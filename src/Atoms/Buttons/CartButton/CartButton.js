import React from 'react';
import './CartButton.scss';

function CartButton(props) {
  return (
    <button className='cartbutton' onClick={props.handleClick}
      aria-labelledby='cartIcon' aria-describedby='cartItems'>
      <img src={process.env.PUBLIC_URL + '/images/cart.svg'}
        alt="Go To Cart" className='cartbutton-icon' id='cartIcon' />
      <span id='cartItems'>{props.cartItems} {(props.cartItems <= 1) ? 'item' : 'items'}</span>
    </button>
  );
}

export default CartButton;
