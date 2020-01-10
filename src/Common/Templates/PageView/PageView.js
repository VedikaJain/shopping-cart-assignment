import React from 'react';
import './PageView.scss';
import Form from '../../Atoms/Form/Form';

function PageView(props) {
  return (
    <div className='pageview'>
      <div>
        <h2 id='formTitle'>{props.title}</h2>
        <p id='formDescription'>{props.description}</p>
      </div>
      <div className='pageview-rightpage'>
        <Form formInputs={props.formInputs} buttonText={props.title} formSubmit={props.formSubmit}/>
      </div>
    </div>
  );
}

export default PageView;
