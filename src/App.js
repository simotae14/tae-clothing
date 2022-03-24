import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const Shop = () => {
  return <div>I am the shop component</div>
}

const App = () => {
  return (
    <Routes>
      <Route
        path='/home'
        element={<Home />}
      >
        <Route
          path='shop' // /home/shop
          element={<Shop />}
        />
      </Route>
    </Routes>
  );
}

export default App;
