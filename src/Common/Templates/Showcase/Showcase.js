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
      <figure className='showcase'
        aria-label={cat.name} aria-describedby={cat.description}>
        {props.imgAlign === 'left' &&
          <img src={process.env.PUBLIC_URL + cat.imageUrl} alt={cat.description} className='showcase-image' />}
        <div className='showcase-content'>
          <div className='showcase-content-heading'>{cat.name}</div>
          <figcaption className='showcase-content-description'>
            {cat.description}
          </figcaption>
          <PinkButton text={'Explore ' + cat.key} handleClick={selectCategory} 
            ariaLabel={'Explore ' + cat.key}/>
        </div>
        {props.imgAlign === 'right' &&
          <img src={process.env.PUBLIC_URL + cat.imageUrl} alt={cat.description} className='showcase-image' />}
      </figure>
    )
}

export default withRouter(connect(null, { saveData })(Showcase));
