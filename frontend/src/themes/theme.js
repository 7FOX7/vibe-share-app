import { createTheme } from "@mui/material"
import deepPurple from "@mui/material/colors/deepPurple"
import orange from "@mui/material/colors/orange"
import brown from "@mui/material/colors/brown"
import pink from "@mui/material/colors/pink"
import blue from "@mui/material/colors/blue"

const baseTypography = {
    fontFamily: '"Poppins", sans-serif', 
    fontStyle: "normal", 
}

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
        semiTransparentBlack: {
            main: "rgba(0, 0, 0, 0.4)"
        }, 
        registration: {
            linkColor: {
                main: blue[600], 
                light: blue[400]
            }, 
        }, 
        home: {
            itemBarTextColor: {
                main: brown[300]
            }, 
        }, 
        clubs: {
            clubTitleColor: {
                main: "rgba(0, 0, 0, 0.8)"
            }, 
            joinedButtonColor: {
                main: "rgba(0, 0, 0, 0.3)"
            }
        }, 
        notifications: {

        }, 
        chats: {
            authorUsernameColor: {
                main: "rgba(0, 0, 0, 0.8)"
            }, 
            commentContent: {
                main: "rgba(0, 0, 0, 0.7)"
            }
        }
    }, 
    
    typography: {
        ...baseTypography, 
        mainContent: {
           ...baseTypography 
        }, 
        home: {

        }, 
        global: {
            appBar: {
                fontSize: "1.3rem", 
                fontWeight: "600"
            }
        }, 
        clubs: {
            clubTitle: {
                fontSize: "1.15rem",  
                fontWeight: "600"
            }, 
            viewAll_mobile: {
                fontSize: "1.2rem"
            }, 
            viewAll_desktop: {
                fontSize: "1.3rem"
            }
        }, 
        notifications: {
            activityStats: {
                fontSize: "1.06rem", 
                fontWeight: "600"
            }, 
        }, 
        chats: {
            authorUsername: {
                fontSize: "1.15rem", 
                fontWeight: "600"
            }, 
            publishDate: {
                fontSize: "0.7rem"
            }
        }, 
        createPost: {
            stepLabel: {
                fontSize: "0.8rem", 
                fontWeight: "600"
            },
            postPreview: {
                fontSize: "1.1rem"
            }, 
        }, 
        createVideo: {
            postButton: {
                fontSize: "1.15rem", 
                fontWeight: "600"
            }, 
        }, 
        postView: {
            wideView: {
                fontSize: "1.45rem", 
                fontWeight: "500"
            }, 
        }, 
        customContainer: {
            mainText: {
                fontSize: "1.35rem", 
                fontWeight: "600"
            }, 
            addText: {
                fontStyle: "italic"
            }
        }, 
        customCommentsSection: {
            username: {
                fontSize: "1.25rem", 
                fontWeight: "600"
            }
        }
    }
})

export default theme