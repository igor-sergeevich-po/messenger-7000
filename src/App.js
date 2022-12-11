
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Test } from './pages/Test';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.scss'
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />

        </Route>

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
