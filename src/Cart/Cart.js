import React, { Component } from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import { putData, fetchData, deleteData } from '../Common/Actions';
import PinkButton from '../Common/Widgets/Buttons/PinkButton/PinkButton';
import CartItem from './CartItem/CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartStatus: ''
    }
  }

  static getDerivedStateFromProps = (props, state) => {
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
    return null;
  }

  componentDidMount() {
    this.props.fetchData('addToCart');
  }

  addQuantity = (productToAdd) => {
    if (productToAdd.stockLeft > 0) {
      const updatedCartItem = {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        imageURL: productToAdd.imageURL,
        stockLeft: productToAdd.stockLeft - 1,
        quantity: productToAdd.quantity + 1
      };
      this.props.putData('addToCart', updatedCartItem);
      this.props.fetchData('addToCart');
    } else {
      console.log('Product is out of stock!');
    }
  }

  reduceQuantity = (productToReduce) => {
    if (productToReduce.quantity > 1) {
      const updatedCartItem = {
        id: productToReduce.id,
        name: productToReduce.name,
        price: productToReduce.price,
        imageURL: productToReduce.imageURL,
        stockLeft: productToReduce.stockLeft + 1,
        quantity: productToReduce.quantity - 1
      };
      this.props.putData('addToCart', updatedCartItem);
      this.props.fetchData('addToCart');
    } else {
      this.props.deleteData('addToCart', productToReduce.id);
      this.props.fetchData('addToCart');
    }
  }

  cartSubmit = (event) => {
    if (window.matchMedia('(min-width: 1025px)').matches) { // $screen-laptop
      this.props.cartSubmit(event);
    } else {
      this.props.history.push('/plp');
    }
  }

  render() {
    const totalItems = this.state.cart.reduce((totalquantity, item) => item.quantity + totalquantity, 0);
    const totalPrice = this.state.cart.reduce(
      (totamount, cartItem) => (cartItem.price * cartItem.quantity) + totamount, 0);
    return (
      <main className='cart' aria-label='My Cart' aria-describedby='totalitems'>
        <div className='cart-header'>
          <span className='cart-header-mycart'>My Cart </span>
          {totalItems > 0 && <span className='cart-header-totalitems' id='totalitems'>
            ({totalItems} {(totalItems <= 1) ? 'item' : 'items'})
          </span>}
        </div>
        <div className='cart-content'>
        {(this.state.cart.length > 0)
          ? <>
            {this.state.cart.map((cartItem) =>
              <CartItem cartItem={cartItem}
                addQuantity={this.addQuantity}
                reduceQuantity={this.reduceQuantity}
                key={cartItem.id} />
            )}
            <figure className='cart-lowestprice'>
              <img src={process.env.PUBLIC_URL + '/images/lowest-price.png'}
                alt='Lowest price here' />
              <figcaption className='cart-body-font-small'>You won't find it cheaper anywhere</figcaption>
            </figure>
          </>
          : <div className='cart-body-empty'>
              <div className='cart-body-empty-noitems'>No items in your cart!</div>
              <div className='cart-body-font-small' >Your favourite items are just a click away</div>
            </div>
        }
        </div>
        <div className={'cart-footer' + ((this.state.cart.length > 0) ? ' cart-footer-border' : '')}>
          {(this.state.cart.length > 0)
            && <div className='cart-footer-promocode cart-body-font-small'>
              Promo code can be applied on payment page
            </div>
          }
          <PinkButton handleClick={this.cartSubmit}
            text={(this.state.cart.length > 0)
              ? 'Proceed to Checkout'
              : 'Start Shopping'}
            rightContent={(this.state.cart.length > 0)
              ? 'Rs.' + totalPrice + ' >'
              : ''}
            ariaLabel={(this.state.cart.length > 0)
              ? 'Proceed to Checkout Rs. ' + totalPrice
              : 'Start Shopping'}/>
        </div>
      </main>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart
  };
}

export default connect(mapStateToProps, { putData, fetchData, deleteData })(Cart);
