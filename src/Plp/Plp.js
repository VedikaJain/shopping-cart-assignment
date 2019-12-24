import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../Common/Widgets/DropDown/DropDown';
import LeftPane from '../Common/Templates/LeftPane/LeftPane';
import Grid from '../Common/Templates/Grid/Grid';
import { connect } from 'react-redux';
import { fetchData, saveData, putData, postData } from '../Common/Actions/index';

export class Plp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      cart: [],
      selectedCategory: {},
      cartStatus: ''
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
    if (props.cart !== state.cart) {
      return {
        cart: props.cart
      };
    }
    if (props.cartStatus !== state.cartStatus) {
      if (props.cartStatus !== 201 && props.cartStatus !== 200) {
        console.log('Error updating cart: ' + props.cartStatus);
      }
      return {
        cartStatus: props.cartStatus
      }
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
    this.props.fetchData('addToCart');
    this.props.fetchData('categories');
  }

  componentWillUnmount() {
    this.selectCategory({});
  }

  selectCategory = (newCategory) => {
    this.props.saveData('selectedCategory', newCategory);
  }

  addToCart = (productToAdd) => {
    const index = this.state.cart.findIndex((cartItem) => productToAdd.id === cartItem.id);
    const newCartItem = {
      id: productToAdd.id,
      name: productToAdd.name,
      price: productToAdd.price,
      imageURL: productToAdd.imageURL
    };
    if (index === -1) {
      if (productToAdd.stock > 0) {
        newCartItem.stockLeft = productToAdd.stock - 1;
        newCartItem.quantity = 1;
        this.props.postData('addToCart', newCartItem);
        this.props.fetchData('addToCart');
      } else {
        console.log('Product is out of stock!');
      }
    } else {
      if (this.state.cart[index].stockLeft > 0) {
        newCartItem.stockLeft = this.state.cart[index].stockLeft - 1;
        newCartItem.quantity = this.state.cart[index].quantity + 1;
        this.props.putData('addToCart', newCartItem);
        this.props.fetchData('addToCart');
      } else {
        console.log('Product is out of stock!');
      }
    }
  }

  render() {
    return (
      <main className="Plp" aria-label='Categories and Products'>
        <DropDown items={this.state.categories}
          selectItem={this.selectCategory}
          alreadySelected={this.props.selectedCategory} />
        <LeftPane items={this.state.categories}
          selectItem={this.selectCategory}
          alreadySelected={this.props.selectedCategory} />
        <Grid addToCart={this.addToCart}
          products={
            (this.props.selectedCategory && this.props.selectedCategory.id)
              ? (this.state.products.filter(
                (product) => product.category === this.props.selectedCategory.id
              ))
              : this.state.products
          }
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.setData.categories,
    products: state.setData.products,
    cart: state.setData.cart,
    selectedCategory: state.setData.selectedCategory,
    cartStatus: state.setData.cartStatus
  }
}

export default connect(mapStateToProps, { fetchData, saveData, putData, postData })(Plp);
