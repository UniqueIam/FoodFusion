import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'

function Home() {
    const [category,setCategory] = useState("All")

  return (
    <>
     <Header />
     <Menu category={category} setCategory={setCategory}/>
    </>
  )
}

export default Home
