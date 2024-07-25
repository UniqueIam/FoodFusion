import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'

function Home() {
    const [category,setCategory] = useState("All")

  return (
    <>
     <Header />
     <Menu category={category} setCategory={setCategory}/>
     <br/>
     <hr/>
     <FoodDisplay category={category}/>
     <Footer />
    </>
  )
}

export default Home
