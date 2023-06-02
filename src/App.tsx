import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login'
import Products from './pages/Products';
import OrdersHistory from './pages/OrdersHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product" element={<Products/>}/>
        <Route path="/orders-history" element={<OrdersHistory/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
    </>
  );
}

export default App;
