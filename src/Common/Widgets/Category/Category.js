import React from 'react';
import './Category.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';
import { withRouter } from 'react-router-dom'

function Category(props) {
  let cat = props.cat;
  return (
    <figure className={'Category ' + (props.imgAlign === 'left'? 'leftDir': 'rightDir')}
      aria-labelledby='categoryName' aria-describedby='categoryDescription'>
      <img src={process.env.PUBLIC_URL + cat.imageUrl} alt={cat.description} className="catImg"/>
      <div>
        <h3 id='categoryName'>{cat.name}</h3>
        <figcaption id='categoryDescription'>{cat.description}</figcaption>
        <PinkButton text={'Explore ' + cat.key} handleClick={()=>{
          props.history.push(`/plp/${cat.id}`);
        }}/>
      </div>
    </figure>
  );
}

export default withRouter(Category);
