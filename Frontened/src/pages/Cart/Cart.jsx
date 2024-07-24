import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, foodList, removeFromCart,url,getTotalCartAmount } = useContext(StoreContext);
  console.log(foodList, cartItems);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-header'>
          <span>Item</span>
          <span>Title</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <div id='underline'></div>
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            console.log('Image URL:', url+"/uploads/"+item.image);
            return (
              <div key={index} className='cart-item'>
                <div className='cart-item-image'>
                  <img src={url+"/uploads/"+item.image} alt='image' style={{height:"60px", width:"60px"}} />
                </div>
                <span className='cart-item-title'>{item.name}</span>
                <span className='cart-item-price'>${item.price.toFixed(2)}</span>
                <span className='cart-item-quantity'>{cartItems[item._id]}</span>
                <span className='cart-item-total-price'>${(item.price * cartItems[item._id]).toFixed(2)}</span>
                <div className='cart-item-remove'>
                  <img
                    onClick={() => removeFromCart(item._id)}
                    src={assets.crossIcon}
                    alt='Remove'
                    className='cross'
                  />
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className='cart-bottom'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>$ {getTotalCartAmount()===0?0:2}</p>
              </div>
              <div className='cart-total-details'>
                <p>Total</p>
                <p>$ {getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
              <button onClick={()=>navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        
         <div className='cart-promo-code'>
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
