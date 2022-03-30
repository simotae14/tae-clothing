import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import {
  useParams,
} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import {
  CategoryContainer,
  CategoryTitle,
} from './category.styles';

const Category = () => {
  const isLoading = useSelector(selectCategoriesIsLoading);
  const {
    category,
  } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <CategoryContainer>
            {
              products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
          </CategoryContainer>
        )
      }
    </>
  );
};

export default Category;
