import React from 'react';
import './TwoColumn.scss';
import Form from '../../Widgets/Form/Form';

function TwoColumn(props) {
  return (
    <div className="TwoColumn">
      <div className="Left">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="Right">
        <Form formInputs={props.formInputs} buttonText={props.title} formSubmit={props.formSubmit}/>
      </div>
    </div>
  );
}

export default TwoColumn;
