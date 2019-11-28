import React from 'react';
import './Product.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Product(props) {
  return (
    <div className="Product">
      <h3>{props.prod.name} abcd</h3>
      <img src={process.env.PUBLIC_URL + props.prod.imageURL}
        alt={props.prod.name} className="prodImg"/>
      <p>{props.prod.description}</p>
      <div>
        MRP Rs.{props.prod.price}
        <PinkButton text='Buy Now'/>
      </div>
    </div>
  );
}

export default Product;
