import React from 'react';
import './Products.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Category(props) {
  let flexDirection = props.imgAlign;
  return (
    <div className="Category">
      <div>
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Sabka Bazaar" className="logo"></img>
      </div>
      <div>
        <h3>{flexDirection}</h3>
        <p>Products</p>
        <PinkButton text={'Explore ' + props.cat}/>
      </div>
    </div>
  );
}

export default Category;
