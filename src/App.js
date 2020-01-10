import React, { Component } from 'react';
import './App.scss';
import Header from './Organisms/Header/Header';
import Hr from './Atoms/HorizontalRow/Hr';
import {
  BrowserRouter,
  Switch, Route
} from 'react-router-dom';
import Home from './Organisms/Home/Home';
import Plp from './Organisms/Plp/Plp';
import Login from './Organisms/Login/Login';
import Footer from './Organisms/Footer/Footer';
import Register from './Organisms/Register/Register';
import Cart from './Organisms/Cart/Cart';
import { connect } from 'react-redux';
import { fetchData } from './Actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as Constants from './global-constants';

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
    this.props.fetchData(Constants.UrlCartApi);
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app' aria-label={Constants.SabkaBazaar}>
          <Header cartItems={this.state.cart.reduce(
            (totalItems, cartItem) => cartItem.quantity + totalItems, 0)
          } />
          <Hr type='hr-blue' />
          <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000}/>
          <div id='app-container' className='app-container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path={'/' + Constants.UrlHome} component={Home} />
              <Route exact path={'/' + Constants.UrlPlp} component={Plp} />
              <Route exact path={'/' + Constants.UrlLoginApi} component={Login} />
              <Route exact path={'/' + Constants.UrlRegisterApi} component={Register} />
              <Route exact path={'/' + Constants.UrlCart}  component={Cart} />
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
