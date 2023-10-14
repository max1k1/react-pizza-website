import './scss/app.scss';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart';
import SinglePizza from './Pages/SinglePizza';
import MainLayout from './components/common/Layouts/MainLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<SinglePizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
