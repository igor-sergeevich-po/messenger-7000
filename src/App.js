
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.scss'
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='messenger-7000/'>
          <Route index element={<Registration />} />
          <Route path='/messenger-7000/login' element={<Login />} />
          <Route path='/messenger-7000/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
