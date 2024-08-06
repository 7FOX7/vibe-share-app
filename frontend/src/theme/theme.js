import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        }, 
        secondary: {
            main: "#000"
        }
    }, 
    typography: {
        inputField: {
            fontSize: "1.4rem",  
        }, 
        errorMessage: {
            fontSize: "1.2rem", 
            fontWeight: "500", 
            fontStyle: "cursive"
        }
    }
})

export default theme