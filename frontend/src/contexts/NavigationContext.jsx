import { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext('/home'); 

export const NavigationProvider = ({children}) => {
    const [currentRoute, setCurrentRoute] = useState('/home')
    const location = useLocation()
    const prevLocation = location.length - 1;  

    return <NavigationContext.Provider value={{currentRoute, setCurrentRoute, prevLocation}}>{children}</NavigationContext.Provider>
}

export const useNavigation = () => {
    return useContext(NavigationContext)
}