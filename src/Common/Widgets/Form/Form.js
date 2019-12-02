import React from 'react';
import './Form.scss';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Form(props) {
  return (
    <div className="Form">
      {
        props.type === 'registerForm'
          && <>
              <input type='text' placeholder='First Name' />
              <input type='text' placeholder='Last Name' />
            </>
      }
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      {
        props.type === 'registerForm'
          && <input type='password' placeholder='Confirm Password' />
      }
      <PinkButton text={props.buttonText} handleClick={props.formSubmit} />
    </div>
  );
}

export default Form;
