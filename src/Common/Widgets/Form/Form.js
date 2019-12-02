import React from 'react';
import './Form.scss';
import TextField from '@material-ui/core/TextField';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function Form(props) {
  return (
    <form autoComplete="off" className="Form">
      {
        props.type === 'registerForm'
          && <>
              <TextField label="First Name" />
              <TextField label="Last Name" />
            </>
      }
      <TextField type='email' label="Email" />
      <TextField type='password' label="Password" />
      {
        props.type === 'registerForm'
          && <TextField type='password' label="Confirm Password" />
      }
      <PinkButton text={props.buttonText} handleClick={props.formSubmit} />
    </form>
  );
}

export default Form;
