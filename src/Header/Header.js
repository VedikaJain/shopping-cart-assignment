import React from 'react';
import './Header.scss';
import navigationLinks from './NavLinks.json';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';
import MenuButton from '../Common/Widgets/Buttons/MenuButton/MenuButton';
import Cart from '../Cart/Cart';
import {
  NavLink, withRouter
} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setDrawer] = React.useState(false);
  const [selectedMenuitem, setSelectedMenuitem] = React.useState('home');

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (selectedMenuItem) => {
    setSelectedMenuitem(selectedMenuItem);
    props.history.push('/' + selectedMenuItem);
    setAnchorEl(null);
  };

  const handleClose = () => {
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
      <img alt='Sabka Bazaar Logo' className='header-logo'></img>
      <nav className='header-menu' aria-label='App'>
        <MenuButton ariaControls="navigation-menu" ariaHaspopup="true" ariaLabel='App Navigation Menu'
          handleClick={handleMenuClick} />
        <Menu
          id="navigation-menu"
          aria-label='Navigation Menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant='selectedMenu'
        >
          {navigationLinks.map((navlink) =>
            <MenuItem onClick={() => handleMenuItemClick(navlink.url)}
              selected={selectedMenuitem === navlink.url}
              aria-label={navlink.name}
              className={(selectedMenuitem === navlink.url) ? 'navmenu-item-selected' : ''}>
              {navlink.name}
            </MenuItem>
          )}
        </Menu>
      </nav>
      <nav className='header-links' aria-label='App'>
        {navigationLinks.slice(0, 2).map((navlink) =>
          <NavLink activeClassName='header-link-active' to={'/' + navlink.url} aria-label={navlink.name}
            onClick={() => handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
        )}
      </nav>
      <div className='header-rightpane'>
        <nav className='header-links' aria-label='App'>
          {navigationLinks.slice(2).map((navlink) =>
            <NavLink activeClassName='header-link-active' to={'/' + navlink.url} aria-label={navlink.name}
              onClick={() => handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
          )}
        </nav>
        <CartButton cartItems={props.cartItems} handleClick={openCart} />
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}
          PaperProps={{ className: 'drawer-paper' }}
          ModalProps={{
            className: 'drawer-modal',
            container: document.getElementById('app-container')
          }}
          variant="temporary">
          <Cart cartSubmit={toggleDrawer(false)} />
        </Drawer>
      </div>
    </header>
  );
}

export default withRouter(Header);
