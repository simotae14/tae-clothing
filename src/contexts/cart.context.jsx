import { createContext, useState, useEffect } from 'react';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }
  useEffect(() => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  }, [cartItems]);
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
