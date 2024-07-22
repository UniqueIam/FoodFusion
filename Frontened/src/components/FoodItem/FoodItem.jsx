import React, { useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, image, description, addItem }) => {
  const [itemCount, setItemCount] = useState(0);

  const handleAddItem = () => {
    setItemCount(prev => prev + 1);
    addItem({ id, name, price, image, description });
  };

  const handleRemoveItem = () => {
    setItemCount(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img src={image} className='food-item-image' alt='' />
        {itemCount === 0 ? (
          <img
            id='add-icon'
            onClick={handleAddItem}
            src={assets.add_green}
            alt='Add'
            className='food-item-add-icon'
            style={{height:"23px", width:"23px"}}
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={handleRemoveItem}
              src={assets.minus_red}
              alt='Remove'
              className='food-item-minus-icon'
              style={{height:"23px", width:"23px"}}
            />
            <p id='item-count'>{itemCount}</p>
            <img
              onClick={handleAddItem}
              src={assets.add_green}
              alt='Add'
              className='food-item-add-icon'
              style={{height:"23px", width:"23px"}}
            />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name'>
          <p id='food-name'>{name}</p>
        </div>
        <p className='food-item-description'>{description}</p>
        <p id='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
