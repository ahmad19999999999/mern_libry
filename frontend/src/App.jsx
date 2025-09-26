import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx';
import Register from './user/Register.jsx';
import Login from './user/Login.jsx';
import Books from './pages/books.jsx';


const App = () => {
  return (
    <Router>
      {/* ToastContainer خارج Routes */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books/>} />
        <Route path="/books/:keyword" element={<Books/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
  );
};

export default App;
