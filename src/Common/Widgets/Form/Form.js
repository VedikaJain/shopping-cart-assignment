import React, { Component } from 'react';
import './Form.scss';
import TextField from '@material-ui/core/TextField';
import PinkButton from '../Buttons/PinkButton/PinkButton';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    let target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = () => {
    this.props.formSubmit(this.state);
  }

  render() {
    return (
      <form autoComplete="off" className="Form" onSubmit={(e) => e.preventDefault()}>
        {
          this.props.type === 'registerForm'
          && <>
            <TextField label='First Name' name='firstName' onChange={this.handleChange} />
            <TextField label='Last Name' name='lastName' onChange={this.handleChange} />
          </>
        }
        <TextField type='email' name='email' label="Email" onChange={this.handleChange} />
        <TextField type='password' name='password' label="Password" onChange={this.handleChange} />
        {
          this.props.type === 'registerForm'
          && <TextField type='password' name='confirmPassword'
            label="Confirm Password" onChange={this.handleChange} />
        }
        <PinkButton text={this.props.buttonText} handleClick={this.handleSubmit} />
      </form>
    );
  }
}

export default Form;
