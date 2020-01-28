import React from 'react';
import './CartItem.scss';
import * as Constants from '../../../global-constants';
import PinkButton from '../../../Atoms/Buttons/PinkButton/PinkButton';

function CartItem(props) {
  return (
    <figure className='cartitem'>
      <div className='cartitem__image'>
        <img src={Constants.UrlPublic + props.cartItem.imageURL}
          srcSet={Constants.UrlPublic + props.cartItem.imageURL + ' 300w'}
          sizes={'(' + Constants.MinWidth + Constants.ScreenLaptop + ') 5vw, '
            + '(' + Constants.MinWidth + Constants.ScreenTablet + ') 8vw, '
            + ' 15vw'}
          alt={props.cartItem.name} />
      </div>
      <div className='cartitem__content'>
        <figcaption className='cartitem__heading'>{props.cartItem.name}</figcaption>
        <div className='cartitem__quantity'>
          <PinkButton className='cartitem__pinkbutton'
            text={Constants.SignMinus} handleClick={() => props.reduceQuantity(props.cartItem)}
            ariaLabel={Constants.ReduceQuantity} />
          <span>{props.cartItem.quantity}</span>
          <PinkButton className='cartitem__pinkbutton'
            text={Constants.SignPlus} handleClick={() => props.addQuantity(props.cartItem)}
            ariaLabel={Constants.IncreaseQuantity} />
          <span>{Constants.SignMultiply}</span>
          <span>{Constants.INR + props.cartItem.price}</span>
        </div>
      </div>
      <div className='cartitem__totalprice'>
        {Constants.INR}{props.cartItem.price * props.cartItem.quantity}
      </div>
    </figure>
  );
}

export default CartItem;
