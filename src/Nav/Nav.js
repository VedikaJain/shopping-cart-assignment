import React from 'react';
import './Nav.scss';
import {
  BrowserRouter as Router,
  Link, Switch, Route
} from "react-router-dom";
import Home from '../Home/Home';
import Plp from '../Plp/Plp';
import Login from '../Login/Login';
import Register from '../Register/Register';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';

function Nav(props) {
  return (
    <Router>
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
          <CartButton src={process.env.PUBLIC_URL + '/images/cart.svg'} alt="Cart" cartItems={props.cartItems}/>
        </div>
      </div>
      
      <Switch>
        <Route path="/plp" component="Plp"></Route>
        <Route path="/login" component="Login"></Route>
        <Route path="/register" component="Register"></Route>
        <Route path="/" component="Home"></Route>
      </Switch>
    </Router>
  );
}

export default Nav;
