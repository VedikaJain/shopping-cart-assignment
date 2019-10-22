import React from 'react';
import './Nav.scss';

function Nav() {
  return (
    <div className="Nav">
      <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Sabka Bazaar" className="logo"></img>
      <div>
        <a href="">Home</a>
        <a href="">Products</a>
      </div>
      <div>
        <a href="">Sign in</a>
        <a href="">Register</a>
        <button></button>
      </div>
    </div>
  );
}

export default Nav;
