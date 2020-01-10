import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../../Molecules/DropDown/DropDown';
import LeftPane from '../../Molecules/LeftPane/LeftPane';
import Grid from '../../Molecules/Grid/Grid';
import { connect } from 'react-redux';
import { fetchData, saveData, putData, postData } from '../../Actions/index';
import { toast } from 'react-toastify';
import * as Constants from '../../global-constants';

export class Plp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      cart: [],
      selectedCategory: {},
      cartStatus: '',
      screenTablet: (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenTablet + ')').matches) ? true : false
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
        toast.error(Constants.ErrorUpdatingCart + props.cartStatus,
          { toastId: Constants.ErrorCodeUpdatingCart + props.cartStatus});
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
    this.props.fetchData(Constants.UrlProductsApi);
    this.props.fetchData(Constants.UrlCartApi);
    this.props.fetchData(Constants.UrlCategoriesApi);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.selectCategory({});
    window.removeEventListener('resize', this.handleResize);
  }

  selectCategory = (newCategory) => {
    this.props.saveData(Constants.UrlSelectedCategory, newCategory);
  }

  handleResize = () => {
    this.setState({
      screenTablet: (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenTablet + ')').matches) ? true : false
    });
  }

  addToCart = (productToAdd) => {
    const index = this.props.cart.findIndex((cartItem) => productToAdd.id === cartItem.id);
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
        this.props.postData(Constants.UrlCartApi, newCartItem);
        this.props.fetchData(Constants.UrlCartApi);
      } else {
        toast.info( productToAdd.name + Constants.InfoOutOfStock,
          { toastId: Constants.InfoCodeOutOfStock + productToAdd.id});
      }
    } else {
      if (this.props.cart[index].stockLeft > 0) {
        newCartItem.stockLeft = this.props.cart[index].stockLeft - 1;
        newCartItem.quantity = this.props.cart[index].quantity + 1;
        this.props.putData(Constants.UrlCartApi, newCartItem);
        this.props.fetchData(Constants.UrlCartApi);
      } else {
        toast.info( productToAdd.name + Constants.InfoOutOfStock,
          { toastId: Constants.InfoCodeOutOfStock + productToAdd.id});
      }
    }
  }

  render() {
    return (
      <main className='product-listing-page' aria-label={Constants.CategoriesProducts}>
        {(this.state.screenTablet)
          ? <LeftPane items={this.state.categories}
            selectItem={this.selectCategory}
            alreadySelected={this.props.selectedCategory} />
          : <DropDown items={this.state.categories}
            selectItem={this.selectCategory}
            alreadySelected={this.props.selectedCategory} />
        }
        <Grid addToCart={this.addToCart}
          category={(this.props.selectedCategory && this.props.selectedCategory.name)
            ? this.props.selectedCategory.name : Constants.AllCategories}
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
