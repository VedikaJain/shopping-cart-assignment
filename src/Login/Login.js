import React, { Component } from 'react';
import './Login.scss';
import formInputs from './Login.json';
import PageView from '../Common/Molecules/PageView/PageView';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../Common/Actions';
import { toast } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: ''
    }
  }

  componentWillUnmount() {
    this.props.resetPostStatus('login');
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.loginStatus !== state.loginStatus){
      if(props.loginStatus === 201) {
        toast.success('Successfully logged in!', { toastId: 'sl'});
        props.history.push('/home');
      } else {
        toast.error('Error during Login: ' + props.loginStatus, { toastId: 'edl-' + props.loginStatus});
      }
      return {
        loginStatus: props.loginStatus
      }
    }
    return null;
  }

  loginUser = (user) => {
    this.props.postData('login', user);
  }

  render() {
    return (
      <main className='login'
        aria-labelledby='formTitle' aria-describedby='formDescription'>
        <PageView title="Login"
          description="Get access to your Orders, Wishlist and Recommendations"
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
