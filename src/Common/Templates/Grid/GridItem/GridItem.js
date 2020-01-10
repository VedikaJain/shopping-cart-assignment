import React from 'react';
import './GridItem.scss';
import PinkButton from '../../../Widgets/Buttons/PinkButton/PinkButton';
import Hr from '../../../Widgets/HorizontalRow/Hr';
import * as Constants from '../../../../global-constants';

function GridItem(props) {
  return (
    <div className='griditem' aria-label={props.product.name}>
      <h3 className='griditem-heading'>{props.product.name}</h3>
      <img src={Constants.UrlPublic + props.product.imageURL}
        alt={props.product.name} className="griditem-image" />
      <figcaption className='griditem-description'>
        {props.product.description}
      </figcaption>
      <span className='griditem-footer-text' role='presentation'>
        {Constants.MRP} {Constants.INR}{props.product.price}
      </span>
      <div className='griditem-footer-button'>
        <PinkButton addontext={props.product.price}
          ariaLabel={Constants.BuyNow + ' ' + Constants.SignAt + ' '
            + Constants.INR + props.product.price}
          handleClick={() => props.selectGridItem(props.product)} />
      </div>
      <Hr type='hr-dotted' />
    </div >
  );
}

export default GridItem;
