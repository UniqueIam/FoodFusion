import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Pgp8gRur8rrQBeD7pjB7t5fzEhdwYx2DGTPKmme3HSFUQdXhisv2MsJeF3mrdzMculrfbTLI2PDFqzizMBukZR3001KLYvVAY');

function PlaceOrder() {
    const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);
    const stripe = useStripe();
    const elements = useElements();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        foodList.map((item) => {
            if (cartItems[item._id]) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        };

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            alert('Error in Processing the payment: ' + error.message);
            return;
        }

        let response = await axios.post(url + "/api/order/placeorder", { ...orderData, paymentMethodId: paymentMethod.id }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert('Error in Processing the payment');
        }
    };

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
                <div className='multi-fields'>
                    <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
            </div>
            <div className='place-order-right'>
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
                                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <div className='cart-total-details'>
                                <p>Total</p>
                                <p>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                            </div>
                            <CardElement />
                            <button type='submit'>PROCEED TO PAYMENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

const PlaceOrderWrapper = () => (
    <Elements stripe={stripePromise}>
        <PlaceOrder />
    </Elements>
);

export default PlaceOrderWrapper;
