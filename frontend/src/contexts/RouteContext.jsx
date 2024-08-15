import { useState, useEffect, createContext, useContext } from "react";

const RouteContext = createContext('home')

export const RouteProvider = ({children}) => {
    const [route, setRoute] = useState('home');
    const [prevRoute, setPrevRoute] = useState('') 
    
    useEffect(() => {
        setPrevRoute(route)
    }, [route])

    return <RouteContext.Provider value={{route, setRoute, prevRoute}}>{children}</RouteContext.Provider>
}

export const useRoute = () => {
    return useContext(RouteContext)
}