import React from 'react';
import './CartItem.scss';
import PinkButton from '../../Common/Widgets/Buttons/PinkButton/PinkButton';

function CartItem(props) {
  return (
    <div className='cartItem' aria-label={props.cartItem.name}>
      <img className='cartItem-image' src={process.env.PUBLIC_URL + props.cartItem.imageURL}
        alt={props.cartItem.name} />
      <div className='cartItem-content'>
        <div className='cartItem-content-heading'>{props.cartItem.name}</div>
        <div className='cartItem-content-quantity'>
          <PinkButton text='&minus;' handleClick={props.reduceQuantity}/>
          <span>{props.cartItem.quantity}</span>
          <PinkButton text='+' handleClick={props.addQuantity}/>
          <span>{'x'}</span><span>{'Rs.' + props.cartItem.price}</span>
        </div>
      </div>
      <div className='cartItem-totalprice'>Rs.{props.cartItem.price * props.cartItem.quantity}</div>
    </div >
  );
}

export default CartItem;
