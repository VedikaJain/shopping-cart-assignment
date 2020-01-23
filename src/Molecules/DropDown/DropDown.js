import React, { Component } from 'react';
import './DropDown.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PinkButton from '../../Atoms/Buttons/PinkButton/PinkButton';
import * as Constants from '../../global-constants';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      anchorEl: null
    }
  }
  
  componentDidMount() {
    if (this.props.alreadySelected && this.props.alreadySelected !== ''
      && this.props.alreadySelected !== undefined) {
      this.setSelectedItem(this.props.alreadySelected);
    }
  }

  setSelectedItem = (item) => {
    this.setState({
      selectedItem: item
    }, () => this.props.selectItem({ id: this.state.selectedItem.id }));
  }

  setAnchorEl = (item) => {
    this.setState({
      anchorEl: item
    })
  }

  handleClick = event => {
    this.setAnchorEl(event.currentTarget);
  };
  
  handleMenuItemClick = (item) => {
    (this.state.selectedItem && this.state.selectedItem.id === item.id)
      ? this.setSelectedItem({}) : this.setSelectedItem(item);
    this.handleClose(null);
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  render() {

    return (
      <div className='dropdown'>
        <PinkButton ariaControls='dropdown__menu' ariaHaspopup='true'
          className='dropdown__pinkbutton'
          ariaLabel={(this.state.selectedItem && this.state.selectedItem !== {}
            && this.state.selectedItem.name && this.state.selectedItem.name.length > 0)
            ? Constants.SelectedCategory + this.state.selectedItem.name
            : Constants.SelectCategory}
          text={(this.state.selectedItem && this.state.selectedItem !== {}
            && this.state.selectedItem.name && this.state.selectedItem.name.length > 0)
            ? this.state.selectedItem.name
            : Constants.SelectCategory}
          handleClick={this.handleClick} rightContent={Constants.IconDownArrow} />
        <Menu anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose} className='dropdown__menu'
          id='dropdown__menu'>
          {(this.props.items.length > 0)
            ? this.props.items.map((item, i) =>
              <MenuItem key={i} className='dropdown__menuitem'
                selected={this.state.selectedItem && this.state.selectedItem.id === item.id}
                onClick={() => this.handleMenuItemClick(item)}>
                <p className={'dropdown__text '
                    + ((this.state.selectedItem && this.state.selectedItem.id === item.id)
                      ? 'dropdown__text--selected' : '')}>
                  {item.name}
                </p>
              </MenuItem>
            )
            : <span className='dropdown__content dropdown__content--empty'>
              {Constants.NoAvailableCategory}
            </span>
          }
        </Menu>
      </div>
    );
  }
}

export default DropDown;
