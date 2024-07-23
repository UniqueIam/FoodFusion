import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { foodList, addItem } = useContext(StoreContext);

  return (
    <div className='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {foodList.map((item, index) => {
          if(category === "All" || category === item.category){
            return <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            addItem={addItem}
          />
          }
          
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
