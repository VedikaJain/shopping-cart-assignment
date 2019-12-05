import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../Common/Widgets/DropDown/DropDown';
import LeftPane from '../Common/Templates/LeftPane/LeftPane';
import Products from '../Common/Widgets/Products/Products';
import { connect } from 'react-redux';
import { fetchData } from '../Common/Actions/index';

export class Plp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      catId: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.products !== state.products) {
      return {
        products: props.products
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('products');

    const { selectedCategory } = this.props.match.params;
    if(selectedCategory && selectedCategory !== '') {
      this.selectCategory(selectedCategory);
    }
  }

  selectCategory = (catId) => {
    this.setState({
      catId: catId
    });
  }

  render() {
    return (
      <div className="Plp">
        <DropDown items={this.props.categories} selectItem={this.selectCategory}></DropDown>
        <LeftPane items={this.props.categories} selectItem={this.selectCategory}></LeftPane>
        <Products products={
          (this.state.catId !== '' && this.state.catId !== undefined)
            ? (this.state.products.filter(
                (product) => product.category === this.state.catId
              ))
            : this.state.products
        } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.setData.categories,
    products: state.setData.products
  }
}

export default connect(mapStateToProps, { fetchData })(Plp);
