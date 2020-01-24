import React from 'react';
import './Header.scss';
import navigationLinks from './NavLinks.json';
import CartButton from '../../Atoms/Buttons/CartButton/CartButton';
import IconButton from '../../Atoms/Buttons/IconButton/IconButton';
import {
  NavLink, withRouter
} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as Constants from '../../global-constants';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenuItem, selectMenuItem] = React.useState(Constants.UrlHome);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (menuItem) => {
    selectMenuItem(menuItem);
    props.history.push('/' + menuItem);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <header className='header'>
        <img alt={Constants.Logo} className='header__logo'
          src={Constants.UrlPublic + Constants.ImgLogo}
          srcSet={Constants.UrlPublic + Constants.ImgLogo + ' 1x, '
            + Constants.UrlPublic + Constants.ImgLogo2x + ' 2x'} />
        {(props.screenSize === Constants.ScreenMobile)
          && <nav className='header__nav'>
            <IconButton type={Constants.IconMenu}
              ariaControls='header__nav-menu' ariaHaspopup='true'
              ariaLabel={Constants.App + ' ' + Constants.Navigation}
              handleClick={handleMenuClick} />
            <Menu
              id='header__nav-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant={Constants.VariantSelected}
            >
              {navigationLinks.map((navlink, index) =>
                <MenuItem onClick={() => handleMenuItemClick(navlink.url)}
                  selected={selectedMenuItem === navlink.url}
                  key={index}
                  className={'header__menuitem '
                    + ((selectedMenuItem === navlink.url) ? 'header__menuitem--selected' : '')}>
                  {navlink.name}
                </MenuItem>
              )}
            </Menu>
          </nav>}
        {(props.screenSize === Constants.ScreenTablet || props.screenSize === Constants.ScreenLaptop)
          && <nav className='header__nav'>
            {navigationLinks.slice(0, 2).map((navlink, index) =>
              <NavLink className='header__link' activeClassName='header__link--active'
                to={'/' + navlink.url} key={index}
                onClick={() => handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
            )}
          </nav>}
        <div className='header__rightpane'>
          {(props.screenSize === Constants.ScreenTablet || props.screenSize === Constants.ScreenLaptop)
            && <nav className='header__nav header__nav--right'>
              {navigationLinks.slice(2).map((navlink, index) =>
                <NavLink className='header__link' activeClassName='header__link--active'
                  to={'/' + navlink.url} key={index}
                  onClick={() => handleMenuItemClick(navlink.url)}>{navlink.name}</NavLink>
              )}
            </nav>}
          <CartButton cartItems={props.cartItems} handleClick={(event) => props.openCart(event)} />
        </div>
      </header>
    );
}

export default withRouter(Header);
