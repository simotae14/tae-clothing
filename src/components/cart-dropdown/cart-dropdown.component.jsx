import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { setIsCartOpen } from '../../store/cart/cart.action';

import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(false));
    navigate('/checkout');
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
