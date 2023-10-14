import './scss/app.scss';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart';
import MainLayout from './components/Layouts/MainLayout';
import SinglePizza from './Pages/SinglePizza';

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
