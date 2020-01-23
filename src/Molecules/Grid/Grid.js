import React from 'react';
import './Grid.scss';
import GridItem from './GridItem/GridItem';
import * as Constants from '../../global-constants';

function Grid(props) {
  return (
    <div role='tabpanel' className='grid' id='grid'
      aria-label={Constants.ProductsOf + props.category}>
      {(props.products.length > 0)
        ? props.products.map((product, i) =>
          <GridItem key={i} product={product}
            selectGridItem={props.addToCart} screenSize={props.screenSize}/>
        )
        : <p className='grid__content grid__content--empty'>
          {Constants.NoAvailableProduct}
        </p>}
    </div>
  );
}

export default Grid;
