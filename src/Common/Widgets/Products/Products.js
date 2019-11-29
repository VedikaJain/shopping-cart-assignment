import React from 'react';
import './Products.scss';
import Product from '../Product/Product';

function Products(props) {
  return (
    <div className="Products">
      {props.products.map((product, i)=>
        <Product key={i} product={product}/>
      )}
    </div>
  );
}

export default Products;
