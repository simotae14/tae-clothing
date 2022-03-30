import CART_ACTION_TYPES from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

// utility to check if a product is already added or not into the cart
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToAdd.id ? {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      } : cartItem;
    });
  }
  // return new Array with modified cartItems/ new cart Item
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity: 1,
    },
  ];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(({ id }) => cartItemToRemove.id !== id);
  }
  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map(cartItem => {
    return cartItem.id === cartItemToRemove.id ? {
      ...cartItem,
      quantity: cartItem.quantity - 1,
    } : cartItem;
  });
}

const clearCartItem = (cartItems, cartItemToClear) => {
  // remove that item from the cart
  return cartItems.filter(({ id }) => cartItemToClear.id !== id);
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
