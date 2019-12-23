import React from 'react';
import './Showcase.scss';
import PinkButton from '../../Widgets/Buttons/PinkButton/PinkButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveData } from '../../Actions';

function Showcase(props) {
    const cat = props.cat;

    const selectCategory = () => {
      props.saveData('selectedCategory', props.cat);
      props.history.push(`/plp`);
    }

    return (
      <figure className={'Showcase ' + (props.imgAlign === 'left' ? 'leftDir' : 'rightDir')}
        aria-labelledby='categoryName' aria-describedby='categoryDescription'>
        <img src={process.env.PUBLIC_URL + cat.imageUrl} alt={cat.description} className="catImg" />
        <div>
          <h3 id='categoryName'>{cat.name}</h3>
          <figcaption id='categoryDescription'>{cat.description}</figcaption>
          <PinkButton text={'Explore ' + cat.key} handleClick={selectCategory} />
        </div>
      </figure>
    )
}

export default withRouter(connect(null, { saveData })(Showcase));
