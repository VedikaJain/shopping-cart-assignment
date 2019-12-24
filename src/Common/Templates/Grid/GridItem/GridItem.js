import React from 'react';
import './GridItem.scss';
import PinkButton from '../../../Widgets/Buttons/PinkButton/PinkButton';
import Hr from '../../../Widgets/HorizontalRow/Hr';

function GridItem(props) {
  return (
    <div className='GridItem' aria-labelledby='prodName prodCost' aria-describedby='prodDescription'>
      <h3 id='prodName' className='heading'>{props.product.name}</h3>
      <img src={process.env.PUBLIC_URL + props.product.imageURL}
        alt={props.product.name} className="prodImg" />
      <figcaption id='prodDescription' className='prodDescription'>
        {props.product.description}
      </figcaption>
      <span className='prodPrice' role='presentation'>
        MRP Rs.{props.product.price}
      </span>
      <div className='prodPurchase' aria-label={'Buy now at Rs. ' + props.product.price}>
        <PinkButton addontext={props.product.price}
          handleClick={() => props.selectGridItem(props.product)} />
      </div>
      <Hr type='dotted' />
    </div >
  );
}

export default GridItem;
