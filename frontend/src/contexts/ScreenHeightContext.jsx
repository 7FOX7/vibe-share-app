import { createContext, useContext } from "react";

const ScreenHeightContext = createContext(); 

export const ScreenHeightProvider = ({screenHeight, children}) => {
    return <ScreenHeightContext.Provider value={screenHeight}>{children}</ScreenHeightContext.Provider>
}

export const useScreenHeight = () => {
    return useContext(ScreenHeightContext)
}