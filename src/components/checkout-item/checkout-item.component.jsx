import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.action';

import {
  CheckoutItemContainer,
  ImageContainer,
  ImageComponent,
  ValuesContainer,
  QuantityContainer,
  ArrowStyle,
  QuantityValue,
  RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ImageComponent src={imageUrl} alt='item' />
      </ImageContainer>
      <ValuesContainer>{name}</ValuesContainer>
      <QuantityContainer>
        <ArrowStyle 
          onClick={() => removeItem(cartItem)}
        >
          &#10094;
        </ArrowStyle>
        <QuantityValue>{quantity}</QuantityValue>
        <ArrowStyle 
          onClick={() => addItem(cartItem)}
        >
          &#10095;
        </ArrowStyle>
      </QuantityContainer>
      <ValuesContainer>{price}</ValuesContainer>
      <RemoveButtonContainer 
        onClick={() => clearItem(cartItem)} 
      >
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  )
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);