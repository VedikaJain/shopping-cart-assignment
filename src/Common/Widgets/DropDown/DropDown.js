import React from 'react';
import './DropDown.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PinkButton from '../Buttons/PinkButton/PinkButton';

function DropDown({ items, selectItem }) {
  const [selectedItem, setSelectedItem] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    selectItem(selectedItem.id);
  }, [selectedItem, selectItem]);

  const handleMenuItemClick = (item) => {
    (selectedItem && selectedItem.id === item.id) ? setSelectedItem({}) : setSelectedItem(item);
    handleClose(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="DropDown">
      <PinkButton aria-controls="simple-menu" aria-haspopup="true"
        className='PinkBtn'
        text={
          (selectedItem && selectedItem !== {} && selectedItem.name && selectedItem.name.length > 0)
            ? selectedItem.name
            : 'Select Category'
        }
        handleClick={handleClick}
        icon='downArrow' />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(items.length > 0)
          ? items.map((item, i) =>
            <MenuItem key={i}
              selected={selectedItem && selectedItem.id === item.id}
              onClick={() => handleMenuItemClick(item)}>
              <p className={
                (selectedItem && selectedItem.id === item.id)
                  ? 'menuP selectedText' : 'menuP'}>
                {item.name}
              </p>
            </MenuItem>
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
