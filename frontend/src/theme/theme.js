import { createTheme } from "@mui/material"
import { purple, orange, pink } from "@mui/material/colors"

const theme = createTheme({
    palette: {
        primary: {
            main: purple[600],
            light: purple[300], 
            dark: purple[800] 
        }, 
        secondary: {
            main: orange[50], 
            dark: orange[100]
        }, 
        tertiary: {
            main: pink[400],
            light: pink[100], 
        }, 
        contrastColors: {
            white: {
                main: "#fff"
            }, 
            black: {
                main: "#000"
            }, 
        }, 
        semiTransparentBlack: {
            main: "rgba(0, 0, 0, 0.4)"
        }, 
    }, 
    
    typography: {
        mainContent: {
            fontFamily: '"Poppins", sans-serif', 
            fontStyle: "normal", 
        }, 
        inputField: {
            fontSize: "1.4rem",  
        }, 
        errorMessage: {
            fontSize: "1.2rem", 
            fontWeight: "500", 
            fontStyle: "cursive"
        }, 
        stepLabel: {
            fontSize: "0.8rem", 
            fontWeight: "600"
        }
    }
})

export default theme