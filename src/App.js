
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './style.scss'
import { useContext } from 'react';
import { AuthContext } from './hoc/AuthContext';
// import './App.css';


function App() {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      alert('для начала зарегистрируйся')
      return <Navigate to='/messenger-7000/' />
    } else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='messenger-7000/'>
          <Route index element={<Registration />} />
          <Route path='/messenger-7000/login' element={<Login />} />
          <Route path='/messenger-7000/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route path='/messenger-7000/*' element={<Navigate to='/messenger-7000/' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
