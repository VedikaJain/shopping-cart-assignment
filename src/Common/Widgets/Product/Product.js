import React from 'react';
import './Product.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Product(props) {
  return (
    <div className="Product">

      <figure className='isMobile'
        aria-labelledby='prodName prodCost' aria-describedby='prodDescription'>
        <h3 id='prodName'>{props.product.name}</h3>
        <div className='row'>
          <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg" />
          <div>
            <figcaption id='prodDescription'>{props.product.description}</figcaption>
            <PinkButton text={'Buy Now @ Rs.' + props.product.price}/>
          </div>
        </div>
      </figure>

      <figure className='isTablet'
        aria-labelledby='prodName prodCost' aria-describedby='prodDescription'>
        <h3 id='prodName'>{props.product.name}</h3>
        <div className='row'>
          <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg" />
          <figcaption id='prodDescription'>{props.product.description}</figcaption>
        </div>
        <PinkButton text={'Buy Now @ Rs.' + props.product.price}/>
      </figure>

      <figure className='isLaptop'
        aria-labelledby='prodName prodCost' aria-describedby='prodDescription'>
        <h3 id='prodName'>{props.product.name}</h3>
        <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg"/>
        <figcaption id='prodDescription'>{props.product.description}</figcaption>
        <div className='row'>
          <span id='prodCost'>MRP Rs.{props.product.price}</span>
          <PinkButton text='Buy Now' />
        </div>
      </figure>

    </div>
  );
}

export default Product;
