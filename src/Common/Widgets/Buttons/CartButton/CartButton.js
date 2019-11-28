import React from 'react';
import './CartButton.scss';

function CartButton(props) {
  return (
    <button className="cartButton">
      <img src={props.src} alt={props.alt} className="cart"></img>
      {props.cartItems} items
    </button>
  );
}

export default CartButton;
