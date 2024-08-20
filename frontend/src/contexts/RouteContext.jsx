import { useState, createContext, useContext } from "react";

const RouteContext = createContext('home')

export const RouteProvider = ({children}) => {
    const [route, setRoute] = useState('home');
    return <RouteContext.Provider value={{route, setRoute}}>{children}</RouteContext.Provider>
}

export const useRoute = () => {
    return useContext(RouteContext)
}