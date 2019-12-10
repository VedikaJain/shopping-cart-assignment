import React, { Component } from 'react';
import './Login.scss';
import formInputs from './Login.json';
import TwoColumn from '../Common/Templates/TwoColumn/TwoColumn';
import { connect } from 'react-redux';
import { postData, resetPostStatus } from '../Common/Actions';

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
        props.history.push('/home');
      } else {
        console.log('Error during Login: '+ props.loginStatus);
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
      <main className="Login"
        aria-labelledby='formTitle' aria-describedby='formDescription'>
        <TwoColumn title="Login"
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
