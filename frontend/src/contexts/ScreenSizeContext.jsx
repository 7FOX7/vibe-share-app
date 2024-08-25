import { useState, useEffect, createContext, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../theme/theme";

const ScreenSizeContext = createContext(''); 

export const ScreenSizeProvider = ({children}) => {
    const [screenWidth, setScreenWidth] = useState(innerWidth); 
    const [screenHeight, setScreenHeight] = useState(innerHeight);
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    function checkScreenWidth() {
        const currentScreenWidth = innerWidth; 
        setScreenWidth(currentScreenWidth)
    }

    function checkScreenHeight() {
        const currentScreenHeight = innerHeight
        setScreenHeight(currentScreenHeight)
    }

    useEffect(() => {
        function handleResize() {
            checkScreenWidth(); 
            checkScreenHeight(); 
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <ScreenSizeContext.Provider value={{isSmallScreen, screenHeight}}>{children}</ScreenSizeContext.Provider>
}

export const useScreenSize = () => {
    return useContext(ScreenSizeContext)
}