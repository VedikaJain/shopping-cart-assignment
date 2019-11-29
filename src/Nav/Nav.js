import React from 'react';
import './Nav.scss';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';
import {
  Link
} from "react-router-dom";

function Nav(props) {
  return (
    <div className="Nav">
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Sabka Bazaar" className="logo"></img>
        <div className="tabs">
          <Link to="/">Home</Link>
          <Link to="/plp">Products</Link>
        </div>
        <div className="vertAlign">
          <div>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Register</Link>
          </div>
          <CartButton src={process.env.PUBLIC_URL + '/images/cart.svg'} alt="Cart" cartItems={props.cartItems} />
        </div>
      </div>
  );
}

export default Nav;
