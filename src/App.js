import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';

import { GlobalStyle } from './global.styles';

import Spinner from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path='/'
            element={<Navigation />}
          >
            <Route
              index
              element={(<Home />)}
            />
            <Route
              path='shop/*'
              element={<Shop />}
            />
            <Route
              path='auth'
              element={<Authentication />}
            />
            <Route
              path='checkout'
              element={<Checkout />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
