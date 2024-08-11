import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const menuRef = useRef(null);
  const footerRef = useRef(null); 

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} menuRef={menuRef} footerRef={footerRef} />
      <Routes>
        <Route path='/' element={<Home menuRef={menuRef} footerRef={footerRef} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>

    </>
  );
}

export default App;
