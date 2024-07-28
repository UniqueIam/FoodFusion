import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Order.css';

const Order = ({url}) => {

  const [orders,setOrders ] = useState([]);

  const fetchAllOrders = async() =>{
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const statusHandler =  async(event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
        await fetchAllOrders();
    }
  }
  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='admin-orders'>
      <h2>Order Page</h2>
      <div className='admin-order-list'>
        {orders.map((order,index)=>{
          return(
            <div key={index} className='admin-order-item'>
              <img src={assets.parcel_icon} alt='' style={{height:"30px",width:"30px"}}/>
              <div>
                <p className='admin-order-item-food'>
                  {order.items.map((item,index)=>{
                      if(index === order.items.length-1){
                        return item.name + " x " + item.quantity
                      }
                      else{
                        return item.name + " x " + item.quantity + " , "
                      }
                  })}
                </p>
                <p className='admin-order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className='admin-order-item-address'>
                <p> {order.address.street+","}</p>
                <p>{order.address.city+","+order.address.state+","+order.address.country}</p> 
                </div>
                <p className='admin-order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Total Amount: ${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing </option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
                  
          )
        })}
      </div>
    </div>
  )
}

export default Order
