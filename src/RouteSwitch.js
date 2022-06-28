import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './Home';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
