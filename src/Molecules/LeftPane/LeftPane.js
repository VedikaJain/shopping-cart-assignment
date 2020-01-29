import React, { Component } from 'react';
import './LeftPane.scss';
import MenuItemButton from '../../Atoms/Buttons/MenuItemButton/MenuItemButton';
import * as Constants from '../../global-constants';

class LeftPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {}
    }
  }

  componentDidMount() {
    if (this.props.alreadySelected && this.props.alreadySelected !== '' && this.props.alreadySelected !== undefined) {
      this.setSelectedItem(this.props.alreadySelected);
    }
  }

  setSelectedItem(item) {
    this.setState({
      selectedItem: item
    }, () => this.props.selectItem(this.state.selectedItem));
  }

  render() {
    return (
      <div className='leftpane' role='tablist' aria-label='Categories'>
        {(this.props.items.length > 0)
          ? this.props.items.map((item, i) =>
            <MenuItemButton key={i} text={item.name} ariaControls='grid'
              selected={(this.state.selectedItem.id === item.id) ? true : false}
              handleClick={
                () => (this.state.selectedItem.id === item.id)
                  ? this.setSelectedItem({})
                  : this.setSelectedItem(item)
              }/>
          )
          : <p className='leftpane__content leftpane__content--empty'>
              {Constants.NoAvailableCategory}
            </p>
        }
      </div>
    );
  }
}

export default LeftPane;
