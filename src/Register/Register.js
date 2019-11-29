import React from 'react';
import './Register.scss';
import Category from '../Common/Widgets/Category/Category';
import Carousel from '../Common/Widgets/Carousel/Carousel';

function Register() {
  const categories = ['one', 'two', 'three'];
  return (
    <div className="Home">
      <Carousel/>
      <hr/>
      { categories.map((category, i)=>{
        return <>
          <Category cat={category} key={i} imgAlign={(i%2)?'right':'left'}/>
          <hr/>
        </>}
      )}
    </div>
  );
};

export default Register;
