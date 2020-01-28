import React, { Component } from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import { putData, fetchData, deleteData } from '../../Actions';
import PinkButton from '../../Atoms/Buttons/PinkButton/PinkButton';
import IconButton from '../../Atoms/Buttons/IconButton/IconButton';
import CartItem from './CartItem/CartItem';
import { toast } from 'react-toastify';
import * as Constants from '../../global-constants';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartStatus: '',
      closeCartTabIndex: '-1'
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
      <main className='cart' aria-labelledby='cart__text-mycart' aria-describedby='cart__text-totalitems'>
        <div className='cart__header'>
          <div>
            <span className='cart__text cart__text--font-large' id='cart__text-mycart'>
              {Constants.MyCart}
            </span>
            {totalItems > 0 && <span id='cart__text-totalitems'>
              ({totalItems} {(totalItems <= 1) ? Constants.Item : (Constants.Item + 's')})
            </span>}
          </div>
          {(window.matchMedia('(' + Constants.MinWidth + Constants.ScreenLaptop + ')').matches) &&
            <IconButton type={Constants.IconClose} ariaLabel={Constants.CloseCart}
              handleClick={this.props.cartClose} tabIndex={this.state.closeCartTabIndex}
              className='cart__iconbutton' />
          }
        </div>
        {(this.state.cart.length > 0)
          ? <div className='cart__content'>
            {this.state.cart.map((cartItem) =>
              <CartItem cartItem={cartItem}
                addQuantity={this.addQuantity}
                reduceQuantity={this.reduceQuantity}
                key={cartItem.id} />
            )}
            <figure className='cart__figure'>
              <img src={Constants.UrlPublic + Constants.ImgLowestPrice}
                srcSet={Constants.UrlPublic + Constants.ImgLowestPrice + ' 300w'}
                sizes={'(' + Constants.MinWidth + Constants.ScreenLaptop + ') 20vw, '
                  + '(' + Constants.MinWidth + Constants.ScreenTablet + ') 30vw, '
                  + ' 50vw'}
                alt={Constants.LowestPriceGuaranteed} />
              <figcaption className='cart__text cart__text--font-small'>
                {Constants.LowestPrice}
              </figcaption>
            </figure>
          </div>
          : <div className='cart__content cart__content--empty'>
            <div className='cart__text cart__text--font-large cart__text--padding'>
              {Constants.CartEmpty}
            </div>
            <div className='cart__text cart__text--font-small' >{Constants.CartEmptyFavItems}</div>
          </div>
        }
        <div className={'cart__footer' + ((this.state.cart.length > 0) ? ' cart__footer--border' : '')}>
          {(this.state.cart.length > 0)
            && <div className='cart__text cart__text--font-small cart__text--padding'>
              {Constants.PromoCode}
            </div>
          }
          <PinkButton className='cart__pinkbutton' handleClick={this.cartSubmit}
            text={(this.state.cart.length > 0)
              ? Constants.Checkout
              : Constants.StartShopping}
            rightContent={(this.state.cart.length > 0)
              ? Constants.INR + totalPrice + ' ' + Constants.SignRightArrow
              : ''}
            ariaLabel={(this.state.cart.length > 0)
              ? Constants.TotalCartValue + Constants.INR + totalPrice + '. ' + Constants.Checkout + '.'
              : Constants.StartShopping}
            handleFocus={() => this.setState({
              closeCartTabIndex: '0'
            })} />
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
