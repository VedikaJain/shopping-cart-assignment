import React from 'react';
import './GridItem.scss';
import PinkButton from '../../../Atoms/Buttons/PinkButton/PinkButton';
import Hr from '../../../Atoms/HorizontalRow/Hr';
import * as Constants from '../../../global-constants';

function GridItem(props) {
  return (
    <figure className='griditem'>
      <figcaption className='griditem-heading'>{props.product.name}</figcaption>
      <img src={Constants.UrlPublic + props.product.imageURL}
        alt={props.product.name} className="griditem-image" />
      <div className='griditem-description'>
        {props.product.description}
      </div>
      {props.screenSize === Constants.ScreenLaptop &&
        <span className='griditem-footer-text' role='presentation'>
          {Constants.MRP} {Constants.INR}{props.product.price}
        </span>}
      <div className='griditem-footer-button'>
        {(props.screenSize === Constants.ScreenLaptop)
          ? <PinkButton text={Constants.BuyNow}
            ariaLabel={Constants.BuyNow}
            handleClick={() => props.selectGridItem(props.product)} />
          : <PinkButton text={Constants.BuyNow + ' ' + Constants.SignAt + ' '
            + Constants.INR + props.product.price}
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
