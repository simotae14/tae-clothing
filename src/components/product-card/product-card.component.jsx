import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  Footer,
  ProductCardContainer,
  Name,
  Price,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    imageUrl,
  } = product;
  const {
    addItemToCart,
  } = useContext(CartContext);
  const addProductToCart = () => {
    addItemToCart(product);
  }
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`{name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
