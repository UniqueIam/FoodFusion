// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Order from './Pages/Order/Order';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const App = () => {
  useEffect(()=>{

  })
  
  const url = "http://localhost:8000";
  return (

      <div className='app'>
      <ToastContainer/>
        <Navbar />
        <div className='main-content'>
          <Sidebar />
            <Routes>
              <Route path='/add' element={<Add url={url} />} />
              <Route path='/list' element={<List url={url} />} />
              <Route path='/order' element={<Order url={url} />} />
            </Routes>
        </div>
      </div>
  );
}

export default App;
