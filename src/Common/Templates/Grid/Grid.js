import React from 'react';
import './Grid.scss';
import GridItem from './GridItem/GridItem';

function Grid(props) {
  return (
    <div role='tabpanel' className="Grid" id='Grid'
      aria-labelledby='selectedCategory'>
      {(props.products.length > 0)
        ? props.products.map((product, i)=>
            <GridItem key={i} product={product}/>
          )
        : <p className='noProductsFound'>
            Sorry, there are no available products in this category at the moment!
          </p>}
    </div>
  );
}

export default Grid;
