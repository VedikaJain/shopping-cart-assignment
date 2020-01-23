import React, { Component } from 'react';
import './Register.scss';
import formInputs from './Register.json';
import PageView from '../../Molecules/PageView/PageView';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../../Actions/index';
import { toast } from 'react-toastify';
import * as Constants from '../../global-constants';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerStatus: ''
    }
  }

  componentWillUnmount() {
    this.props.resetPostStatus(Constants.UrlRegisterApi);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.registerStatus !== state.registerStatus) {
      if(props.registerStatus === 201) {
        toast.success(Constants.SuccessRegister, { toastId: Constants.SuccessCodeRegister});
        props.history.push('/' + Constants.UrlHome);        
      } else {
        toast.error(Constants.ErrorRegister + props.registerStatus,
          { toastId: Constants.ErrorCodeRegister + props.registerStatus});
      }
      return {
        registerStatus: props.registerStatus
      }; 
    }
    return null;
  }

  registerUser = (user) => {
    delete user[Constants.ConfirmPassword];
    this.props.postData(Constants.UrlRegisterApi, user);
  }

  render() {
    return (
      <main className='register'
        aria-labelledby='form__title' aria-describedby='form__description'>
        <PageView title={Constants.TitleRegister}
          description={Constants.DescriptionRegister}
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