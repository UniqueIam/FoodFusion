import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';
import { toast } from 'react-toastify';

const Add = ({url,token}) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName || !productDescription || !productPrice || !productCategory || !productImage) {
      toast.error('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('category', productCategory);
    formData.append('image', productImage);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
       headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
        setProductImage(null);
        document.getElementById('product-image').value = null;

        toast.success(response.data.message);
        console.log('Product added successfully:', response.data);
      } else {
        console.error('Unexpected response status:', response.status);
        toast.error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error in adding product');
    }
  };

  return (
    <div className="add">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="product-image">Product Image:</label>
          <input
            type="file"
            id="product-image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
         </div>
         <div className="form-group">
          <label htmlFor="product-description">Product Description:</label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-price">Product Price:</label>
          <input
            type="number"
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-category">Product Category:</label>
          <select
            id="product-category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="select">Select category</option>
            <option value="Pasta">Pasta</option>
            <option value="Maggi">Maggi</option>
            <option value="Biryani">Biryani</option>
            <option value="Dosa">Dosa</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Deserts">Deserts</option>
            <option value="Paneer">Paneer</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
