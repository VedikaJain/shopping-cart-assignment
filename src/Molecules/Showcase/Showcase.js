import React from 'react';
import './Showcase.scss';
import PinkButton from '../../Atoms/Buttons/PinkButton/PinkButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveData } from '../../Actions';
import * as Constants from '../../global-constants';

function Showcase(props) {
    const cat = props.cat;

    const selectCategory = () => {
      props.saveData(Constants.UrlSelectedCategory, props.cat);
      props.history.push('/' + Constants.UrlPlp);
    }

    return (
      <figure className='showcase'
        aria-label={cat.name} aria-describedby={cat.description}>
        {props.imgAlign === 'left' &&
          <img src={Constants.UrlPublic + cat.imageUrl} alt={cat.description} className='showcase-image' />}
        <div className='showcase-content'>
          <div className='showcase-content-heading'>{cat.name}</div>
          <figcaption className='showcase-content-description'>
            {cat.description}
          </figcaption>
          <PinkButton text={Constants.Explore + cat.key} handleClick={selectCategory} 
            ariaLabel={Constants.Explore + cat.key}/>
        </div>
        {props.imgAlign === 'right' &&
          <img src={Constants.UrlPublic + cat.imageUrl} alt={cat.description} className='showcase-image' />}
      </figure>
    )
}

export default withRouter(connect(null, { saveData })(Showcase));
