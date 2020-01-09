import React, { Component } from 'react';
import './Form.scss';
import TextField from '@material-ui/core/TextField';
import PinkButton from '../Buttons/PinkButton/PinkButton';
import { validate } from './Validate';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event, formInput) => {
    let target = event.target;
    this.setState({
      [target.name]: target.value
    });
    this.validateForm(formInput, target.value);
  }

  handleSubmit = () => {
    this.props.formSubmit(this.state);
  }

  validateForm(formInput, value) {
    if (formInput.validations && formInput.validations.length > 0) {
      formInput.errorMessage = formInput.validations.reduce(
        (cumulativeMessage, checkIf) => {
          const errorMessage = (formInput.name === 'confirmPassword')
            ? validate(checkIf, value, this.state.password)
            : validate(checkIf, value);
          return cumulativeMessage
            + ((cumulativeMessage !== '' && errorMessage !== '') ? ', ' : '')
            + errorMessage;
        }, '');
      formInput.valid = (formInput.errorMessage === '') ? true : false;
    } else {
      formInput.errorMessage = '';
      formInput.valid = true;
    }
  }

  render() {
    return (
      (this.props.formInputs && this.props.formInputs.length > 0)
        ? (
          <form autoComplete="off" className='form' onSubmit={(e) => e.preventDefault()}
            aria-labelledby='formTitle' aria-describedby='formDescription'>
            {this.props.formInputs.map((formInput, i) =>
              <TextField key={i} type={formInput.type} name={formInput.name}
                label={formInput.label} id={formInput.name}
                required={formInput.validations.indexOf('required') !== -1}
                onChange={(event) => this.handleChange(event, formInput)}
                error={!formInput.valid && formInput.errorMessage !== ''}
                helperText={formInput.errorMessage}
                aria-label={formInput.label}
                aria-describedby={formInput.errorMessage} />
            )}
            <PinkButton type='submit' text={this.props.buttonText} ariaLabel={this.props.buttonText}
              handleClick={this.handleSubmit}
              disabled={!(this.props.formInputs.reduce(
                (isValid, formInput) => isValid && formInput.valid, true))}
            />
          </form>
        )
        : null
    );
  }
}

export default Form;
