import React from 'react';
import './Product.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Product(props) {
  return (
    <div className="Product">

      <div className='isMobile'>
        <h3>{props.product.name}</h3>
        <div className='row'>
          <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg" />
          <div>
            <p>{props.product.description}</p>
            <PinkButton className="pinkBtn" text={'Buy Now @ Rs.' + props.product.price}/>
          </div>
        </div>
      </div>

      <div className='isTablet'>
        <h3>{props.product.name}</h3>
        <div className='row'>
          <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg" />
          <p>{props.product.description}</p>
        </div>
        <PinkButton className="pinkBtn" text={'Buy Now @ Rs.' + props.product.price}/>
      </div>

      <div className='isLaptop'>
        <h3>{props.product.name}</h3>
        <img src={process.env.PUBLIC_URL + props.product.imageURL}
          alt={props.product.name} className="prodImg" />
        <p>{props.product.description}</p>
        <div className='row'>
          <span>MRP Rs.{props.product.price}</span>
          <PinkButton className="pinkBtn" text='Buy Now' />
        </div>
      </div>

    </div>
  );
}

export default Product;
