import React from 'react';
import './PageView.scss';
import Form from '../../Molecules/Form/Form';

function PageView(props) {
  return (
    <div className='pageview'>
      <div className='pageview__page'>
        <h2 id='form__title'>{props.title}</h2>
        <p id='form__description'>{props.description}</p>
      </div>
      <div className='pageview__page'>
        <Form formInputs={props.formInputs} buttonText={props.title} formSubmit={props.formSubmit}/>
      </div>
    </div>
  );
}

export default PageView;
