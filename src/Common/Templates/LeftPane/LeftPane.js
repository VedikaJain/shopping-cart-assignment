import React, { Component } from 'react';
import './LeftPane.scss';
import Hr from '../../Widgets/HorizontalRow/Hr';

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
      <div className="leftpane" role="tablist" aria-label='Categories'>
        {(this.props.items.length > 0)
          ? this.props.items.map((item, i) =>
            <div key={i}
              id={(this.state.selectedItem.id === item.id) ? 'selectedCategory' : ''}
              role='tab' tabIndex='0' aria-label={item.name}
              aria-controls='Grid'
              aria-selected={(this.state.selectedItem.id === item.id) ? true : false}
              className={(this.state.selectedItem.id === item.id) ? 'leftpane-item-selected' : ''}
              onClick={
                () => (this.state.selectedItem.id === item.id)
                  ? this.setSelectedItem({})
                  : this.setSelectedItem(item)
              }>
              <p className={(this.state.selectedItem.id === item.id) ? 'leftpane-item-selected-text' : ''}>
                {item.name}
              </p>
              <Hr type='hr-grey-solid' />
            </div>
          )
          : <span className='leftpane-empty'>
            Sorry, there are no available categories at the moment!
            </span>
        }
      </div>
    );
  }
}

export default LeftPane;
