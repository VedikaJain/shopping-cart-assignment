import React from 'react';
import './GridItem.scss';
import PinkButton from '../../../Widgets/Buttons/PinkButton/PinkButton';
import Hr from '../../../Widgets/HorizontalRow/Hr';

function GridItem(props) {
  return (
    <div className='griditem' aria-labelledby='prodName prodCost' aria-describedby='prodDescription'>
      <h3 id='prodName' className='griditem-heading'>{props.product.name}</h3>
      <img src={process.env.PUBLIC_URL + props.product.imageURL}
        alt={props.product.name} className="griditem-image" />
      <figcaption id='prodDescription' className='griditem-description'>
        {props.product.description}
      </figcaption>
      <span className='griditem-footer-text' role='presentation'>
        MRP Rs.{props.product.price}
      </span>
      <div className='griditem-footer-button' aria-label={'Buy now at Rs. ' + props.product.price}>
        <PinkButton addontext={props.product.price}
          handleClick={() => props.selectGridItem(props.product)} />
      </div>
      <Hr type='hr-dotted' />
    </div >
  );
}

export default GridItem;
