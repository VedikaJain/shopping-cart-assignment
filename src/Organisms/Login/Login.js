import React, { Component } from 'react';
import './Login.scss';
import formInputs from './Login.json';
import PageView from '../../Molecules/PageView/PageView';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../../Actions';
import { toast } from 'react-toastify';
import * as Constants from '../../global-constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: ''
    }
  }

  componentWillUnmount() {
    this.props.resetPostStatus(Constants.UrlLoginApi);
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.loginStatus !== state.loginStatus){
      if(props.loginStatus === 201) {
        toast.success(Constants.SuccessLogin, { toastId: Constants.SuccessCodeLogin});
        props.history.push('/' + Constants.UrlHome);
      } else {
        toast.error(Constants.ErrorLogin + props.loginStatus,
          { toastId: Constants.ErrorCodeLogin + props.loginStatus});
      }
      return {
        loginStatus: props.loginStatus
      }
    }
    return null;
  }

  loginUser = (user) => {
    this.props.postData(Constants.UrlLoginApi, user);
  }

  render() {
    return (
      <main className='login'
        aria-labelledby='formTitle' aria-describedby='formDescription'>
        <PageView title={Constants.TitleLogin}
          description={Constants.DescriptionLogin}
          formInputs={formInputs} formSubmit={this.loginUser}
        />
      </main>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.setData.loginStatus
  };
}

export default connect(mapStateToProps, {postData, resetPostStatus})(Login);
