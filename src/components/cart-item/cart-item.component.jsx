import React from 'react';

import {
  CartItemContainer,
  CartImage,
  ItemDetails,
  ItemName,
} from './cart-item.styles.jsx';

const CartItem = ({
  cartItem,
}) => {
  const {
    name,
    price,
    quantity,
    imageUrl,
  } = cartItem;
  return (
    <CartItemContainer>
      <CartImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className='price'>{quantity} x ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default React.memo(CartItem);
