import React from 'react';
import './Products.scss';
import Category from '../Common/Widgets/Category/Category';
import Carousel from '../Common/Widgets/Carousel/Carousel';

export const Products = () => {
  const categories = ['one', 'two', 'three'];
  return (
    <div className="Home">
      <Carousel/>
      <hr/>
      { categories.map((category, i)=>{
        return <>
          <Category cat={category} key={i} imgAlign={(i%2)?'right':'left'}/>
          <hr/>
        </>}
      )}
    </div>
  );
};
