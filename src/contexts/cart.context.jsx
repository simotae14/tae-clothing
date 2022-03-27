import { createContext, useState } from 'react';

// utility to check if a product is already added or not into the cart
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToAdd.id ? {
        ...cartItem,
        quantity: cartItem.quantity + 1
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
