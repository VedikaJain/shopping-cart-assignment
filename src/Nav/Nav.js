import React from 'react';
import './Nav.scss';
import CartButton from '../Common/Widgets/Buttons/CartButton/CartButton';
import {
  Link, NavLink, withRouter
} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

function Nav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    props.history.push(url);
    setAnchorEl(null);
  };

  return (
    <div className="Nav">
      <img alt="Sabka Bazaar" className="logo"></img>
      <nav className='isNotMobile'>
        <NavLink activeClassName="activeRoute" to="/home">Home</NavLink>
        <NavLink activeClassName="activeRoute" to="/plp">Products</NavLink>
      </nav>
      <nav className='isMobile'>
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
        <div className='isNotMobile'>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </div>
        <CartButton cartItems={props.cartItems} />
      </div>
    </div>
  );
}

export default withRouter(Nav);
