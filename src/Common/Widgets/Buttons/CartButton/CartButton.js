import React from 'react';
import './CartButton.scss';

function CartButton(props) {
  return (
    <button className="cartButton">
      <img src={process.env.PUBLIC_URL + '/images/cart.svg'} alt="Go To Cart" className="cart"></img>
      {props.cartItems} items
    </button>
  );
}

export default CartButton;
