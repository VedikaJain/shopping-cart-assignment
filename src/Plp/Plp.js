import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../Common/Widgets/DropDown/DropDown';
import LeftPane from '../Common/Templates/LeftPane/LeftPane';
import Grid from '../Common/Templates/Grid/Grid';
import { connect } from 'react-redux';
import { fetchData, saveData } from '../Common/Actions/index';

export class Plp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      selectedCategory: {},
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
    if (props.selectedCategory !== state.selectedCategory) {
      return {
        selectedCategory: props.selectedCategory
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('products');
    this.props.fetchData('categories');
  }

  componentWillUnmount() {
    this.selectCategory({});
  }

  selectCategory = (newCategory) => {
    this.props.saveData('selectedCategory', newCategory);
  }

  render() {
    return (
      <main className="Plp" aria-label='Categories and Products'>
        <DropDown items={this.state.categories}
          selectItem={this.selectCategory}
          alreadySelected={this.props.selectedCategory}/>
        <LeftPane items={this.state.categories}
          selectItem={this.selectCategory}
          alreadySelected={this.props.selectedCategory}/>
        <Grid products={
          (this.props.selectedCategory && this.props.selectedCategory.id)
            ? (this.state.products.filter(
                (product) => product.category === this.props.selectedCategory.id
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
    products: state.setData.products,
    selectedCategory: state.setData.selectedCategory
  }
}

export default connect(mapStateToProps, { fetchData, saveData })(Plp);
