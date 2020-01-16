import React from 'react';
import './CartItem.scss';
import * as Constants from '../../../global-constants';
import PinkButton from '../../../Atoms/Buttons/PinkButton/PinkButton';

function CartItem(props) {
  return (
    <figure className='cartitem'>
      <img className='cartitem-image' src={Constants.UrlPublic + props.cartItem.imageURL}
        alt={props.cartItem.name} />
      <div className='cartitem-content'>
        <figcaption className='cartitem-content-heading'>{props.cartItem.name}</figcaption>
        <div className='cartitem-content-quantity'>
          <PinkButton text={Constants.SignMinus} handleClick={() => props.reduceQuantity(props.cartItem)}
            ariaLabel={Constants.ReduceQuantity}/>
          <span>{props.cartItem.quantity}</span>
          <PinkButton text={Constants.SignPlus} handleClick={() => props.addQuantity(props.cartItem)}
            ariaLabel={Constants.IncreaseQuantity}/>
          <span>{Constants.SignMultiply}</span>
          <span>{Constants.INR + props.cartItem.price}</span>
        </div>
      </div>
      <div className='cartitem-totalprice'>
        {Constants.INR}{props.cartItem.price * props.cartItem.quantity}
      </div>
    </figure>
  );
}

export default CartItem;
