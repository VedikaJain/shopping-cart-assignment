import React, { Component } from 'react';
import './Plp.scss';
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
  }

  componentDidMount() {
    this.props.fetchData('products');

    const { selectedCategory } = this.props.match.params;
    if(selectedCategory && selectedCategory !== '') {
      this.selectCategory(selectedCategory);
    }
  }

  selectCategory = (catId) => {
    console.log('Category ID: ', catId);
    this.setState({
      catId: catId
    });
  }

  render() {
    console.log('plp categories ' + JSON.stringify(this.props.categories));
    console.log('plp products ' + JSON.stringify(this.state.products));
    return (
      <div className="Plp">
        <LeftPane items={this.props.categories} selectItem={this.selectCategory}></LeftPane>
        <Products products={
          (this.state.catId !== '')
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
