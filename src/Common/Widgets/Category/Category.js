import React from 'react';
import './Category.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Category(props) {
  let cat = props.cat;
  return (
    <div className={'Category ' + (props.imgAlign === 'left'? 'leftDir': 'rightDir')}>
      <img src={process.env.PUBLIC_URL + cat.imageUrl} alt={cat.name} className="catImg"/>
      <div>
        <h3>{cat.name}</h3>
        <p>{cat.description}</p>
        <PinkButton text={'Explore ' + cat.key}/>
      </div>
    </div>
  );
}

export default Category;
