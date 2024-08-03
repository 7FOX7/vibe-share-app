import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        }
    }, 
    typography: {
        inputField: {
            fontSize: "1.4rem",  
        }
    }
})

export default theme