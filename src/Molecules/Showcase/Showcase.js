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
      <figure className='showcase'>
        {props.imgAlign === Constants.Left &&
          <img src={Constants.UrlPublic + cat.imageUrl} alt={cat.name} className='showcase__image' />}
        <div className='showcase__content'>
          <figcaption className='showcase__heading'>{cat.name}</figcaption>
          <div className='showcase__description'>
            {cat.description}
          </div>
          <PinkButton text={Constants.Explore + cat.key} handleClick={selectCategory} 
            ariaLabel={Constants.Explore + cat.key}/>
        </div>
        {props.imgAlign === Constants.Right &&
          <img src={Constants.UrlPublic + cat.imageUrl} alt={cat.name} className='showcase__image' />}
      </figure>
    )
}

export default withRouter(connect(null, { saveData })(Showcase));
