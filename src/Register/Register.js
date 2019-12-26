import React, { Component } from 'react';
import './Register.scss';
import formInputs from './Register.json';
import PageView from '../Common/Templates/PageView/PageView';
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
    delete user['confirmPassword'];
    this.props.postData('register', user);
  }

  render() {
    return (
      <main className='register'
        aria-labelledby='formTitle' aria-describedby='formDescription'>
        <PageView title="Signup"
          description="We do not share your personal details with anyone."
          formInputs={formInputs} formSubmit={this.registerUser}
        />
      </main>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    registerStatus: state.setData.registerStatus
  }
}

export default connect(mapStateToProps, { postData, resetPostStatus })(Register);