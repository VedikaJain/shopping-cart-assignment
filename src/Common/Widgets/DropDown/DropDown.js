import React from 'react';
import './DropDown.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function DropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    props.selectItem(item.id);
    setAnchorEl(null);
  };

  return (
    <div className="DropDown">
      <PinkButton aria-controls="simple-menu" aria-haspopup="true"
        className='PinkBtn' text='Select Category' handleClick={handleClick}
        icon='downArrow' />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(props.items.length > 0)
          ? props.items.map((item, i) =>
              <MenuItem key={i} onClick={() => handleClose(item)}>{item.name}</MenuItem>
            )
          : <span className='noCategoriesFound'>
              Sorry, there are no available categories at the moment!
            </span>
        }
      </Menu>
    </div>
  );
}

export default DropDown;
