import React, { Component } from 'react';
import './Cart.scss';
import { connect } from 'react-redux';
import { postData, fetchData } from '../Common/Actions';
import PinkButton from '../Common/Widgets/Buttons/PinkButton/PinkButton';

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
    const totalItems = this.state.cart.length;
    return (
      <main className="Cart" aria-label='Cart' aria-describedby='formDescription'>
        <div>
          <h3>My Cart</h3>
          {totalItems > 0 && <span>
            ({totalItems} {(totalItems <= 1) ? 'item' : 'items'})
          </span>}
        </div>
        {/* <CartItem/> */}
        <figure>
          <img src={process.env.PUBLIC_URL + '/images/lowest-price.png'} />
          <figcaption>You won't find it cheaper anywhere</figcaption>
        </figure>
        <div>
          <span>Promo code can be applied on payment page</span>
          <PinkButton />
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
