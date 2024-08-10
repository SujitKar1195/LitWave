import React, {useEffect} from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import {Routes, Route} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AllBooks from './pages/AllBooks';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ViewBook from './components/ViewBook/ViewBook';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem('id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('role')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/all-books'
          element={<AllBooks />}
        />
        <Route
          path='/login'
          element={<LogIn />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/book/:id'
          element={<ViewBook />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
