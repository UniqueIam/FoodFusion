import { createContext } from "react";
import { foodList } from "../assets/assets";

const StoreContext = createContext();

const StoreContextProvider = (props) =>{

    const contextValue = {
        foodList
    }
    return(
        <StoreContext.Provider value={contextValue}>
           {props.children}
        </StoreContext.Provider>
    )
}

export {StoreContextProvider,StoreContext};

