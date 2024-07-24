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
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newItemCount = prev[itemId] ? prev[itemId] + 1 : 1;
      const updatedCartItems = { ...prev, [itemId]: newItemCount };
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save to localStorage
      return updatedCartItems;
    });
  };

  const removeFromCart = (itemId) => {
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
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmout += itemInfo.price * cartItems[item];
      }
    }
    return totalAmout;
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
