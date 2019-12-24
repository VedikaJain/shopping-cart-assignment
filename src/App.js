import React, { Component } from 'react';
import './App.scss';
import Header from './Header/Header';
import Hr from './Common/Widgets/HorizontalRow/Hr';
import {
  BrowserRouter,
  Switch, Route
} from "react-router-dom";
import Home from './Home/Home';
import Plp from './Plp/Plp';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Register from './Register/Register';
import Cart from './Cart/Cart';
import { connect } from 'react-redux';
import { fetchData } from './Common/Actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.cart !== state.cart) {
      return {
        cart: props.cart
      }
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('addToCart');
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App" aria-label='Sabka Bazaar'>
          <Header cartItems={this.state.cart.reduce(
            (totalItems, cartItem) => cartItem.quantity + totalItems, 0)
          } />
          <Hr type="blue" />
          <div id='drawer-container' className='drawer-container'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/plp" component={Plp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={Cart} />
              <Route component={Home} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart
  }
}

export default connect(mapStateToProps, { fetchData })(App);
