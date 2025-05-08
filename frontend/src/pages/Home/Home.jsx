import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoddDisplay from '../../components/FoodDisplay/FoddDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
const Home=() => {
  const[category,setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoddDisplay category={category} />
      <AppDownload/>
    
    </div>
  )
}

export default Home
