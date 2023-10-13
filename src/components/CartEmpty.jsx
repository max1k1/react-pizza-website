import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>
          Cart is empty <icon>😕</icon>
        </h2>
        <p>
          You probably haven't ordered any pizzas.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
