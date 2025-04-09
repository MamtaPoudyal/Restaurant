import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoddDisplay = (category) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image}/>

            })}
        </div>
      
    </div>
  )
}

export default FoddDisplay
