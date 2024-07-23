import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, image, description }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img src={url + "/uploads/" + image} className='food-item-image' alt={name} />
        {!cartItems[id] ? (
          <img
            id='add-icon'
            onClick={() => addToCart(id)}
            src={assets.add_green}
            alt='Add'
            className='food-item-add-icon'
            style={{ height: '23px', width: '23px' }}
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.minus_red}
              alt='Remove'
              className='food-item-minus-icon'
              style={{ height: '23px', width: '23px' }}
            />
            <p id='item-count'>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_green}
              alt='Add'
              className='food-item-add-icon'
              style={{ height: '23px', width: '23px' }}
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
