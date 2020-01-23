import React, { Component } from 'react';
import './App.scss';
import Header from './Organisms/Header/Header';
import Hr from './Atoms/HorizontalRow/Hr';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './Organisms/Home/Home';
import Plp from './Organisms/Plp/Plp';
import Login from './Organisms/Login/Login';
import Footer from './Organisms/Footer/Footer';
import Register from './Organisms/Register/Register';
import Cart from './Organisms/Cart/Cart';
import { connect } from 'react-redux';
import { fetchData } from './Actions/index';
import { ToastContainer, toast } from 'react-toastify';
import Drawer from '@material-ui/core/Drawer';
import 'react-toastify/dist/ReactToastify.min.css';
import * as Constants from './global-constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      isDrawerOpen: false,
      screenSize: window.matchMedia('(' + Constants.MinWidth + Constants.ScreenLaptop + ')').matches
        ? Constants.ScreenLaptop
        : (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenTablet + ')').matches
          ? Constants.ScreenTablet : Constants.ScreenMobile)
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

  handleResize = (event) => {
    this.setState({
      screenSize: window.matchMedia('(' + Constants.MinWidth + Constants.ScreenLaptop + ')').matches
        ? Constants.ScreenLaptop
        : (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenTablet + ')').matches
          ? Constants.ScreenTablet : Constants.ScreenMobile)
    }, () => {
      if (this.state.isDrawerOpen
        && (this.state.screenSize === Constants.ScreenMobile || this.state.screenSize === Constants.ScreenTablet)) {
        this.toggleDrawer(false)(event);
        this.props.history.push('/' + Constants.UrlCart);
      }
      if (this.props.location.pathname === ('/' + Constants.UrlCart)
        && this.state.screenSize === Constants.ScreenLaptop) {
        this.toggleDrawer(true)(event);
        this.props.history.goBack();
      }
    });
  }

  openCart = (event) => {
    if (this.state.screenSize === Constants.ScreenLaptop) {
      this.toggleDrawer(!this.state.isDrawerOpen)(event);
    } else {
      this.props.history.push('/' + Constants.UrlCart);
    }
  }

  componentDidMount() {
    this.props.fetchData(Constants.UrlCartApi);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({
      isDrawerOpen: open
    })
  };

  render() {
    return (
      <div className='app'>
        <Header screenSize={this.state.screenSize}
          cartItems={this.state.cart.reduce(
            (totalItems, cartItem) => cartItem.quantity + totalItems, 0)
          }
          openCart={this.openCart} />
        <Hr type='hr--blue' />
        <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000} />
        <div id='app__container' className='app__container'>
          <Switch>
            <Route exact path='/' 
              render={(props) => <Home {...props} screenSize={this.state.screenSize} />} />
            <Route exact path={'/' + Constants.UrlHome}
              render={(props) => <Home {...props} screenSize={this.state.screenSize} />} />
            <Route exact path={'/' + Constants.UrlPlp}
              render={(props) => <Plp {...props} screenSize={this.state.screenSize} />} />
            <Route exact path={'/' + Constants.UrlLoginApi} component={Login} />
            <Route exact path={'/' + Constants.UrlRegisterApi} component={Register} />
            <Route exact path={'/' + Constants.UrlCart} component={Cart} />
          </Switch>
          <Drawer anchor={Constants.Right} open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}
            PaperProps={{ className: 'drawer__paper' }}
            ModalProps={{
              className: 'drawer__modal',
              container: document.getElementById('app__container')
            }}
            variant={Constants.VariantTemporary}>
            <Cart cartSubmit={this.toggleDrawer(false)} cartClose={this.toggleDrawer(false)} />
          </Drawer>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(App));
