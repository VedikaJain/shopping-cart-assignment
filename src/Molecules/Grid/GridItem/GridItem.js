import React from 'react';
import './GridItem.scss';
import PinkButton from '../../../Atoms/Buttons/PinkButton/PinkButton';
import Hr from '../../../Atoms/HorizontalRow/Hr';
import * as Constants from '../../../global-constants';

function GridItem(props) {
  return (
    <figure className='griditem'>
      <figcaption className='griditem__heading'>{props.product.name}</figcaption>
      <img src={Constants.UrlPublic + props.product.imageURL}
        alt={props.product.name} className='griditem__image' />
      <div className='griditem__description'>
        {props.product.description}
      </div>
      {props.screenSize === Constants.ScreenLaptop &&
        <span className='griditem__footer' role='presentation'>
          {Constants.MRP} {Constants.INR}{props.product.price}
        </span>}
      <div className='griditem__button'>
        {(props.screenSize === Constants.ScreenLaptop)
          ? <PinkButton text={Constants.BuyNow}
            className='griditem__pinkbutton'
            ariaLabel={Constants.BuyNow}
            handleClick={() => props.selectGridItem(props.product)} />
          : <PinkButton text={Constants.BuyNow + ' ' + Constants.SignAt + ' '
              + Constants.INR + props.product.price}
            className='griditem__pinkbutton'
            ariaLabel={Constants.BuyNow + ' ' + Constants.SignAt + ' '
              + Constants.INR + props.product.price}
            handleClick={() => props.selectGridItem(props.product)} />
        }
      </div>
      <Hr type='hr--dotted' />
    </figure >
  );
}

export default GridItem;
