import React, { useState,useRef,useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';

function Home() {
  const [category, setCategory] = useState("All");
  const menuRef = useRef(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.scrollToMenu) {
      menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory} menuRef={menuRef} />
      <br />
      <hr />
      <FoodDisplay category={category} />
      <Footer />
    </>
  );
}

export default Home;
