import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import {
  useParams,
} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import {
  CategoryContainer,
  CategoryTitle,
} from './category.styles';

const Category = () => {
  const {
    category,
  } = useParams();
  console.log('render/re-rendering category component');

  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </>
  );
};

export default Category;
