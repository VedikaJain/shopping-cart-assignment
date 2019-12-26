import React from 'react';
import './Header.scss';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';
import Cart from '../Cart/Cart';
import {
  NavLink, withRouter
} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setDrawer] = React.useState(false);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    props.history.push(url);
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  };

  const openCart = (event) => {
    if (window.matchMedia('(min-width: 1025px)').matches) { // $screen-laptop
      toggleDrawer(!isDrawerOpen)(event);
    } else {
      props.history.push('/cart');
    }
  }

  return (
    <header className='header'>
      <img alt='Sabka Bazaar' className='header-logo'></img>
      <nav className='header-menu' aria-label='App'>
        <MenuIcon aria-controls="navigation-menu" aria-haspopup="true"
          className='header-menu-icon' onClick={handleMenuClick} />
        <Menu
          id="navigation-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose('/home')}>Home</MenuItem>
          <MenuItem onClick={() => handleClose('/plp')}>Products</MenuItem>
          <MenuItem onClick={() => handleClose('/login')}>Sign in</MenuItem>
          <MenuItem onClick={() => handleClose('/register')}>Register</MenuItem>
        </Menu>
      </nav>
      <nav className='header-links' aria-label='App'>
        <NavLink activeClassName='header-link-active' to="/home">Home</NavLink>
        <NavLink activeClassName='header-link-active' to="/plp">Products</NavLink>
      </nav>
      <div className='header-rightpane'>
        <nav className='header-links' aria-label='App'>
          <NavLink activeClassName='header-link-active' to="/login">Sign in</NavLink>
          <NavLink activeClassName='header-link-active' to="/register">Register</NavLink>
        </nav>
        <CartButton cartItems={props.cartItems} handleClick={openCart} />
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)} className='drawer'
          PaperProps={{ className: 'drawer-paper' }}
          ModalProps={{
            className: 'drawer-modal',
            container: document.getElementById('app-container')
          }}
          variant="temporary">
            <Cart cartSubmit={toggleDrawer(false)}/>
        </Drawer>
      </div>
    </header>
  );
}

export default withRouter(Header);
