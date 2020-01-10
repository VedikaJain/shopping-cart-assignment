import React, { Component } from 'react';
import './Register.scss';
import formInputs from './Register.json';
import PageView from '../../Common/Molecules/PageView/PageView';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../../Common/Actions/index';
import { toast } from 'react-toastify';

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
        toast.success('Registered user successfully!', { toastId: 'sr'});
        props.history.push(`/home`);        
      } else {
        toast.error('Error during Signup: ' + props.registerStatus, { toastId: 'edr-' + props.registerStatus});
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