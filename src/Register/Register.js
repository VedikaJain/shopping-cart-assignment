import React, { Component } from 'react';
import './Register.scss';
import TwoColumn from '../Common/Templates/TwoColumn/TwoColumn';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../Common/Actions/index';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerStatus: ''
    }
  }

  componentWillUnmount() {
    this.props.resetPostStatus('register');
  }

  static getDerivedStateFromProps(props, state) {
    if (props.registerStatus !== state.registerStatus) {
      if(props.registerStatus === 201) {
        props.history.push(`/home`);        
      } else {
        console.log('Error during Signup: ' + props.registerStatus);
      }
      return {
        registerStatus: props.registerStatus
      }; 
    }
    return null;
  }

  registerUser = (user) => {
    this.props.postData('register', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });
  }

  render() {
    return (
      <div className="Register">
        <TwoColumn
          title="Signup"
          description="We do not share your personal details with anyone."
          formType="registerForm"
          formSubmit={this.registerUser}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    registerStatus: state.setData.registerStatus
  }
}

export default connect(mapStateToProps, { postData, resetPostStatus })(Register);