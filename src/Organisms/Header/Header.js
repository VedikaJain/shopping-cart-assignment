import React, { Component } from 'react';
import './Header.scss';
import navigationLinks from './NavLinks.json';
import CartButton from '../../Atoms/Buttons/CartButton/CartButton';
import IconButton from '../../Atoms/Buttons/IconButton/IconButton';
import Cart from '../Cart/Cart';
import {
  NavLink, withRouter
} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import * as Constants from '../../global-constants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isDrawerOpen: false,
      selectedMenuItem: Constants.UrlHome,
      screenSize: window.matchMedia('(' + Constants.MinWidth + Constants.ScreenLaptop + ')').matches
        ? Constants.ScreenLaptop
        : (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenTablet + ')').matches
          ? Constants.ScreenTablet : Constants.ScreenMobile)
    }
  }

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleMenuItemClick = (selectedMenuItem) => {
    this.setState({
      selectedMenuitem: selectedMenuItem
    });
    this.props.history.push('/' + selectedMenuItem);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({
      isDrawerOpen: open
    });
  };

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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  openCart = (event) => {
    if (this.state.screenSize === Constants.ScreenLaptop) {
      this.toggleDrawer(!this.state.isDrawerOpen)(event);
    } else {
      this.props.history.push('/' + Constants.UrlCart);
    }
  }

  render() {
    return (
      <header className='header'>
        <img alt={Constants.Logo} className='header__logo'
          src={Constants.UrlPublic + Constants.ImgLogo}
          srcSet={Constants.UrlPublic + Constants.ImgLogo + ', '
           + Constants.UrlPublic + Constants.ImgLogo2x + ' 2x'} />
        {(this.state.screenSize === Constants.ScreenMobile)
          && <nav className='header__nav'>
            <IconButton type={Constants.IconMenu}
              ariaControls='header__nav-menu' ariaHaspopup='true'
              ariaLabel={Constants.App + ' ' + Constants.Navigation}
              handleClick={this.handleMenuClick} />
            <Menu
              id='header__nav-menu'
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              variant={Constants.VariantSelected}
            >
              {navigationLinks.map((navlink, index) =>
                <MenuItem onClick={() => this.handleMenuItemClick(navlink.url)}
                  selected={this.state.selectedMenuitem === navlink.url}
                  key={index}
                  className={'header__menuitem '
                    + ((this.state.selectedMenuitem === navlink.url) ? 'header__menuitem--selected' : '')}>
                  {navlink.name}
                </MenuItem>
              )}
            </Menu>
          </nav>}
        {(this.state.screenSize === Constants.ScreenTablet || this.state.screenSize === Constants.ScreenLaptop)
          && <nav className='header__nav'>
            {navigationLinks.slice(0, 2).map((navlink, index) =>
              <NavLink activeClassName='header__link--active' to={'/' + navlink.url}
                key={index}
                onClick={() => this.handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
            )}
          </nav>}
        <div className='header__rightpane'>
          {(this.state.screenSize === Constants.ScreenTablet || this.state.screenSize === Constants.ScreenLaptop)
            && <nav className='header__nav header__nav--right'>
              {navigationLinks.slice(2).map((navlink, index) =>
                <NavLink activeClassName='header__link--active' to={'/' + navlink.url}
                  key={index}
                  onClick={() => this.handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
              )}
            </nav>}
          <CartButton cartItems={this.props.cartItems} handleClick={this.openCart} />
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
      </header>
    );
  }
}

export default withRouter(Header);
