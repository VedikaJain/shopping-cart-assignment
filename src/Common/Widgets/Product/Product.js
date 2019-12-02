import React from 'react';
import './Product.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Product(props) {
  return (
    <div className="Product">
      <h3>{props.product.name}</h3>
      <img src={process.env.PUBLIC_URL + props.product.imageURL}
        alt={props.product.name} className="prodImg"/>
      <p>{props.product.description}</p>
      <div>
        <span>MRP Rs.{props.product.price}</span>
        <PinkButton className="pinkBtn" text='Buy Now'/>
      </div>
    </div>
  );
}

export default Product;
