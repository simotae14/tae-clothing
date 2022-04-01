import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import {
  Route,
  Routes,
} from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import { fetchCategoriesStart } from '../../store/categories/category.action';

const CategoriesPreview = lazy(() => import('../categories-preview/categories-preview.component'));
const Category = lazy(() => import('../category/category.component'));

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          index
          element={<CategoriesPreview />}
        />
        <Route
          path=':category'
          element={<Category />}
        />
      </Routes>
    </Suspense>

  );
};

export default Shop;
