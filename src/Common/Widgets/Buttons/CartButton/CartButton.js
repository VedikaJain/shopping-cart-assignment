import React from 'react';
import './CartButton.scss';

function CartButton(props) {
  return (
    <button className="cartButton" aria-labelledby='cartIcon' aria-describedby='cartItems'>
      <img src={process.env.PUBLIC_URL + '/images/cart.svg'}
        alt="Go To Cart" className="cart" id='cartIcon'/>
      <span id='cartItems'>{props.cartItems} items</span>
    </button>
  );
}

export default CartButton;
