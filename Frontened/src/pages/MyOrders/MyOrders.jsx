import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

 function MyOrders() {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
        <div className='myorders'>
            <h2>My Orders</h2>
            <div className='my-orders-container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-orders'>
                            <img src={assets.parcel_icon} alt='' style={{height:"50px",width:"50px"}} />
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length-1){
                                    return item.name+" x "+item.quantity
                                }
                                else{
                                    return item.name+" x "+item.quantity+" ,"
                                }
                            })}</p>
                            <p>$ {order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders} id='track-order'>Track order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
