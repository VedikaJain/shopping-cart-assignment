import React from 'react';
import './CartItem.scss';
import * as Constants from '../../../global-constants';
import PinkButton from '../../../Atoms/Buttons/PinkButton/PinkButton';

function CartItem(props) {
  return (
    <div className='cartitem' aria-label={props.cartItem.name}>
      <img className='cartitem-image' src={Constants.UrlPublic + props.cartItem.imageURL}
        alt={props.cartItem.name} />
      <div className='cartitem-content'>
        <div className='cartitem-content-heading'>{props.cartItem.name}</div>
        <div className='cartitem-content-quantity'>
          <PinkButton text={Constants.SignMinus} handleClick={() => props.reduceQuantity(props.cartItem)}
            ariaLabel={Constants.ReduceQuantity}/>
          <span aria-label={Constants.ItemQuantity + props.cartItem.quantity}>
            {props.cartItem.quantity}
          </span>
          <PinkButton text={Constants.SignPlus} handleClick={() => props.addQuantity(props.cartItem)}
            ariaLabel={Constants.IncreaseQuantity}/>
          <span>{Constants.SignMultiply}</span>
          <span aria-label={Constants.ItemPrice + props.cartItem.price}>{Constants.INR + props.cartItem.price}
          </span>
        </div>
      </div>
      <div className='cartitem-totalprice'
        aria-label={Constants.TotalItemValue + Constants.INR + props.cartItem.price * props.cartItem.quantity}>
        {Constants.INR}{props.cartItem.price * props.cartItem.quantity}
      </div>
    </div >
  );
}

export default CartItem;
