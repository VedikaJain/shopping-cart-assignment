import React from 'react';
import './Header.scss';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';
import {
  Link, NavLink, withRouter
} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    props.history.push(url);
    setAnchorEl(null);
  };

  return (
    <header className="Header">
      <img alt="Sabka Bazaar" className="logo"></img>
      <nav className='isNotMobile' aria-label='App'>
        <NavLink activeClassName="activeRoute" to="/home">Home</NavLink>
        <NavLink activeClassName="activeRoute" to="/plp">Products</NavLink>
      </nav>
      <nav className='isMobile' aria-label='App'>
        <MenuIcon aria-controls="navigation-menu" aria-haspopup="true"
          className='menuIcon' onClick={handleClick}/>
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
      <div className="vertAlign">
        <nav className='isNotMobile' aria-label='App'>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </nav>
        <CartButton cartItems={props.cartItems} />
      </div>
    </header>
  );
}

export default withRouter(Header);
