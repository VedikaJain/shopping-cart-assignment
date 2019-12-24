import React, { Component } from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import { postData, fetchData } from '../Common/Actions';
import PinkButton from '../Common/Widgets/Buttons/PinkButton/PinkButton';
import CartItem from './CartItem/CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.cart !== state.cart) {
      return {
        cart: props.cart
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('addToCart');
  }

  render() {
    const totalItems = this.state.cart.reduce((totalquantity, item) => item.quantity + totalquantity, 0);
    return (
      <main className='cart' aria-label='My Cart' aria-describedby='totalitems'>
        <div className='cart-header'>
          <span className='cart-header-mycart'>My Cart </span>
          {totalItems > 0 && <span className='cart-header-totalitems' id='totalitems'>
            ({totalItems} {(totalItems <= 1) ? 'item' : 'items'})
          </span>}
        </div>
        {(this.state.cart.length > 0)
          ? <>
              { this.state.cart.map((cartItem) =>
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
        <div className={'cart-footer' + ((this.state.cart.length > 0) ? ' cart-footer-border' : '')}>
          { (this.state.cart.length > 0) 
            && <div className='cart-footer-promocode cart-body-font-small'>
              Promo code can be applied on payment page
            </div>
          }
          <PinkButton handleClick={this.handleSubmit}
            text={(this.state.cart.length > 0)
              ? 'Proceed to Checkout Rs.' + this.state.cart.reduce(
                (totamount, cartItem) => cartItem.price + totamount, 0) + ' >'
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

export default connect(mapStateToProps, { postData, fetchData })(Cart);
