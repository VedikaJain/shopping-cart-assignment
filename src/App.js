import React, { Component } from 'react';
import './App.scss';
import Header from './Header/Header';
import Hr from './Common/Atoms/HorizontalRow/Hr';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <div className='app' aria-label='Sabka Bazaar'>
          <Header cartItems={this.state.cart.reduce(
            (totalItems, cartItem) => cartItem.quantity + totalItems, 0)
          } />
          <Hr type="hr-blue" />
          <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000}/>
          <div id='app-container' className='app-container'>
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
