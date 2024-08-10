import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const url = "http://localhost:8000";
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems && storedCartItems !== "undefined") {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage:", error);
        localStorage.removeItem('cartItems'); 
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newItemCount = prev[itemId] ? prev[itemId] + 1 : 1;
      const updatedCartItems = { ...prev, [itemId]: newItemCount };
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); 
      return updatedCartItems;
    });
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        const { [itemId]: _, ...rest } = prev;
        localStorage.setItem('cartItems', JSON.stringify(rest)); // Save to localStorage
        return rest;
      } else {
        const updatedCartItems = { ...prev, [itemId]: prev[itemId] - 1 };
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save to localStorage
        return updatedCartItems;
      }
    });
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    console.log(response.data.data);
    setFoodList(response.data.data);
  };

  const loadCartData = async(token) =>{
     const response = await axios.post(url+"/api/cart/get",{},{
                    headers:{ Authorization: `Bearer ${token}` }
      
    });
    setCartItems(response.data.cartData);
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo && itemInfo.price) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.error(`Item info or price not found for item ID: ${item}`);
        }
      }
    }
    return totalAmount;
  }
  

  const contextValue = {
    foodList,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider, StoreContext };
