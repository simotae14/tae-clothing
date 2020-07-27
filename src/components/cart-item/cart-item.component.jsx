import React from 'react';

import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer,
  NameWrapper
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <ImageContainer src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <NameWrapper>{name}</NameWrapper>
      <span className='price'>{quantity} x ${price}</span>
    </ItemDetailsContainer>
  </CartItemContainer>
);


export default CartItem;