import React from 'react';
import './Register.scss';
import TwoColumn from '../Common/Templates/TwoColumn/TwoColumn';

function Register() {
  return (
    <div className="Register">
      <TwoColumn
        title="Signup"
        description="We do not share your personal details with anyone."
        formType="registerForm"
        formSubmit={()=>{
          
        }}
      />
    </div>
  );
};

export default Register;
