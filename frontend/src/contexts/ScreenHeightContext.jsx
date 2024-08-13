import { useState, useEffect, createContext, useContext } from "react";

const ScreenHeightContext = createContext(); 

export const ScreenHeightProvider = ({children}) => {
    const [screenHeight, setScreenHeight] = useState(innerHeight); 

    useEffect(() => {
      function handleResize() {
        const height = innerHeight
        console.log('height was updated to ' + height)
        setScreenHeight(height)
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return <ScreenHeightContext.Provider value={screenHeight}>{children}</ScreenHeightContext.Provider>
}

export const useScreenHeight = () => {
    return useContext(ScreenHeightContext)
}