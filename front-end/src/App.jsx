import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AllBooks from './pages/AllBooks';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

const App = () => {
  return (
    <div>
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
