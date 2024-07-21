import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({url}) => {
  

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch food items');
      }
    } catch (error) {
      toast.error('Error fetching food items');
      console.error('Error fetching food items:', error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

      if (response.data.success) {
        toast.success('Food item removed successfully');
        await fetchList(); 
      } else {
        toast.error('Failed to remove food item');
      }
    } catch (error) {
      toast.error('Error removing food item');
      console.error('Error removing food item:', error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="food-list">
      <h2>Food Items</h2>
      <div className="food-grid">
        {list.map((item) => (
          <div key={item._id} className="food-item">
            <img src={`http://localhost:8000/uploads/${item.image}`} alt={item.name} className="food-image" />
            <div className="food-details">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              <button onClick={() => removeFood(item._id)} className="delete-button">❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
