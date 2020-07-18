import { createSelector } from 'reselect';

// INPUT SELECTOR
const selectCart = state => state.cart;

// OUTPUT SELECTOR
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// OUTPUT SELECTOR FOR CART ITEMS COUNT
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)
);

// OUTPUT SELECTOR FOR CART HIDDEN
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);