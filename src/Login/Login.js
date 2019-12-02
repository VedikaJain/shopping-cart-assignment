import React from 'react';
import './Login.scss';
import TwoColumn from '../Common/Templates/TwoColumn/TwoColumn';

function Login() {
  return (
    <div className="Login">
      <TwoColumn
        title="Login"
        description="Get access to your Orders, Wishlist and Recommendations"
        formType="loginForm"
        formSubmit={()=>{
          
        }}
      />
    </div>
  );
};

export default Login;
