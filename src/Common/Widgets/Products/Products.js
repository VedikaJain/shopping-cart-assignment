import React from 'react';
import './Products.scss';
import Product from '../Product/Product';

function Products(props) {
  return (
    <section className="Products" aria-label='Products'>
      {(props.products.length > 0)
        ? props.products.map((product, i)=>
            <Product key={i} product={product}/>
          )
        : <p className='noProductsFound'>
            Sorry, there are no available products in this category at the moment!
          </p>}
    </section>
  );
}

export default Products;
