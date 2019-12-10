import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../Common/Widgets/DropDown/DropDown';
import LeftPane from '../Common/Templates/LeftPane/LeftPane';
import Grid from '../Common/Templates/Grid/Grid';
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
    if (props.categories !== state.categories) {
      return {
        categories: props.categories
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('products');
    this.props.fetchData('categories');

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
      <main className="Plp" aria-label='Categories and Products'>
        <DropDown items={this.state.categories} selectItem={this.selectCategory}></DropDown>
        <LeftPane items={this.state.categories}
          selectItem={this.selectCategory}></LeftPane>
        <Grid products={
          (this.state.catId !== '' && this.state.catId !== undefined)
            ? (this.state.products.filter(
                (product) => product.category === this.state.catId
              ))
            : this.state.products
        } />
      </main>
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
