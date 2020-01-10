import React, { Component } from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import { putData, fetchData, deleteData } from '../../Common/Actions';
import PinkButton from '../../Common/Atoms/Buttons/PinkButton/PinkButton';
import IconButton from '../../Common/Atoms/Buttons/IconButton/IconButton';
import CartItem from './CartItem/CartItem';
import { toast } from 'react-toastify';
import * as Constants from '../../global-constants';

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
      if (props.cartStatus !== Constants.RespCodeSuccess && props.cartStatus !== Constants.RespCodeCreated) {
        toast.error(Constants.ErrorUpdatingCart + props.cartStatus,
          { toastId: Constants.ErrorCodeUpdatingCart + props.cartStatus });
      }
      return {
        cartStatus: props.cartStatus
      }
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData(Constants.UrlCartApi);
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
      this.props.putData(Constants.UrlCartApi, updatedCartItem);
      this.props.fetchData(Constants.UrlCartApi);
    } else {
      toast.info(productToAdd.name + Constants.InfoOutOfStock,
        { toastId: Constants.InfoCodeOutOfStock + productToAdd.id });
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
      this.props.putData(Constants.UrlCartApi, updatedCartItem);
      this.props.fetchData(Constants.UrlCartApi);
    } else {
      this.props.deleteData(Constants.UrlCartApi, productToReduce.id);
      this.props.fetchData(Constants.UrlCartApi);
    }
  }

  cartSubmit = (event) => {
    if (this.state.cart.length > 0) {
      toast.success(Constants.SuccessShopping, { toastId: Constants.SuccessCodeShopping });
    }
    if (window.matchMedia('(' + Constants.MinWidth + Constants.ScreenLaptop + ')').matches) {
      this.props.cartSubmit(event);
    } else {
      this.props.history.push('/' + Constants.UrlPlp);
    }
  }

  render() {
    const totalItems = this.state.cart.reduce((totalquantity, item) => item.quantity + totalquantity, 0);
    const totalPrice = this.state.cart.reduce(
      (totamount, cartItem) => (cartItem.price * cartItem.quantity) + totamount, 0);
    return (
      <main className='cart' aria-label={Constants.MyCart} aria-describedby='totalitems'>
        <div className='cart-header'>
          <div>
            <span className='cart-header-mycart'>{Constants.MyCart} </span>
            {totalItems > 0 && <span className='cart-header-totalitems' id='totalitems'>
              ({totalItems} {(totalItems <= 1) ? Constants.Item : (Constants.Item + 's')})
            </span>}
          </div>
          <IconButton type={Constants.IconClose} ariaLabel={Constants.CloseCart}
            handleClick={this.props.cartClose} />
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
                <img src={Constants.UrlPublic + Constants.ImgLowestPrice}
                  alt={Constants.LowestPriceGuaranteed} />
                <figcaption className='cart-body-font-small'>{Constants.LowestPrice}</figcaption>
              </figure>
            </>
            : <div className='cart-body-empty'>
              <div className='cart-body-empty-noitems'>{Constants.CartEmpty}</div>
              <div className='cart-body-font-small' >{Constants.CartEmptyFavItems}</div>
            </div>
          }
        </div>
        <div className={'cart-footer' + ((this.state.cart.length > 0) ? ' cart-footer-border' : '')}>
          {(this.state.cart.length > 0)
            && <div className='cart-footer-promocode cart-body-font-small'>
              {Constants.PromoCode}
            </div>
          }
          <PinkButton handleClick={this.cartSubmit}
            text={(this.state.cart.length > 0)
              ? Constants.Checkout
              : Constants.StartShopping}
            rightContent={(this.state.cart.length > 0)
              ? Constants.INR + totalPrice + ' ' + Constants.SignRightArrow
              : ''}
            ariaLabel={(this.state.cart.length > 0)
              ? Constants.TotalCartValue + Constants.INR + totalPrice + '. ' + Constants.Checkout + '.'
              : Constants.StartShopping} />
        </div>
      </main>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart,
    cartStatus: state.setData.cartStatus
  };
}

export default connect(mapStateToProps, { putData, fetchData, deleteData })(Cart);
