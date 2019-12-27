import React from 'react';
import './CartItem.scss';
import PinkButton from '../../Common/Widgets/Buttons/PinkButton/PinkButton';

function CartItem(props) {
  return (
    <div className='cartitem' aria-label={props.cartItem.name}>
      <img className='cartitem-image' src={process.env.PUBLIC_URL + props.cartItem.imageURL}
        alt={props.cartItem.name} />
      <div className='cartitem-content'>
        <div className='cartitem-content-heading'>{props.cartItem.name}</div>
        <div className='cartitem-content-quantity'>
          <PinkButton text='&minus;' handleClick={() => props.reduceQuantity(props.cartItem)}
            ariaLabel='Reduce quantity'/>
          <span>{props.cartItem.quantity}</span>
          <PinkButton text='+' handleClick={() => props.addQuantity(props.cartItem)}
            ariaLabel='Increase quantity'/>
          <span>{'x'}</span><span>{'Rs.' + props.cartItem.price}</span>
        </div>
      </div>
      <div className='cartitem-totalprice'>Rs.{props.cartItem.price * props.cartItem.quantity}</div>
    </div >
  );
}

export default CartItem;
