import { createTheme } from "@mui/material"
import deepPurple from "@mui/material/colors/deepPurple"
import orange from "@mui/material/colors/orange"
import brown from "@mui/material/colors/brown"
import pink from "@mui/material/colors/pink"
import blue from "@mui/material/colors/blue"

const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple[700],
            light: deepPurple[300], 
            dark: deepPurple[900] 
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
        goldColors: {
            goldDefault: {
                main: "#ffc400"
            }, 
            goldLight: {
                main: "#ffcf33"
            }, 
            goldDark: {
                main: "#b28900"
            }
        }, 
        itemBarTextColor: {
            main: brown[300]
        }, 
        semiTransparentBlack: {
            main: "rgba(0, 0, 0, 0.4)"
        }, 
        linkColor: {
            main: blue[600], 
            light: blue[400]
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
        },
        usernameAppBar: {
            fontSize: "1.3rem", 
            fontWeight: "500"
        }, 
        postTextPreview: {
            fontSize: "1.1rem"
        }, 
        postTextWideView: {
            fontSize: "1.45rem", 
            fontWeight: "500"
        }, 
        postVideoButton: {
            fontSize: "1.15rem", 
            fontWeight: "600"
        }
    }
})

export default theme