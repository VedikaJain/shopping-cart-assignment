import React, { Component } from 'react';
import './Plp.scss';
import DropDown from '../../Common/Atoms/DropDown/DropDown';
import LeftPane from '../../Common/Molecules/LeftPane/LeftPane';
import Grid from '../../Common/Molecules/Grid/Grid';
import { connect } from 'react-redux';
import { fetchData, saveData, putData, postData } from '../../Common/Actions/index';
import { toast } from 'react-toastify';

export class Plp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      cart: [],
      selectedCategory: {},
      cartStatus: '',
      screenTablet: (window.matchMedia('(min-width: 481px)').matches) ? true : false
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
        toast.error('Error updating cart: ' + props.cartStatus, { toastId: 'euc-' + props.cartStatus});
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
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.selectCategory({});
    window.removeEventListener('resize', this.handleResize);
  }

  selectCategory = (newCategory) => {
    this.props.saveData('selectedCategory', newCategory);
  }

  handleResize = () => {
    this.setState({
      screenTablet: (window.matchMedia('(min-width: 481px)').matches) ? true : false
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
        this.props.postData('addToCart', newCartItem);
        this.props.fetchData('addToCart');
      } else {
        toast.info( productToAdd.name + ' is out of stock!', { toastId: 'oos-' + productToAdd.id});
      }
    } else {
      if (this.props.cart[index].stockLeft > 0) {
        newCartItem.stockLeft = this.props.cart[index].stockLeft - 1;
        newCartItem.quantity = this.props.cart[index].quantity + 1;
        this.props.putData('addToCart', newCartItem);
        this.props.fetchData('addToCart');
      } else {
        toast.info( productToAdd.name + ' is out of stock!', { toastId: 'oos-' + productToAdd.id});
      }
    }
  }

  render() {
    return (
      <main className='product-listing-page' aria-label='Categories and Products'>
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
            ? this.props.selectedCategory.name : 'All categories'}
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
