import React from 'react';
import './Products.scss';
import Product from '../Product/Product';

function Products(props) {
  return (
    <div role='tabpanel' className="Products" id='Products'
      aria-labelledby='selectedCategory'>
      {(props.products.length > 0)
        ? props.products.map((product, i)=>
            <Product key={i} product={product}/>
          )
        : <p className='noProductsFound'>
            Sorry, there are no available products in this category at the moment!
          </p>}
    </div>
  );
}

export default Products;
