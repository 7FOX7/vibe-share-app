import { createTheme } from "@mui/material"
import blue from "@mui/material/colors/blue"

const baseTypography = {
    fontFamily: '"Poppins", sans-serif', 
    fontStyle: "normal", 
}

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#00ccc2",
            light: "#00f2e6", 
            dark: "#00bfb6"
        }, 
        secondary: {
            main: "#0c0060", 
            dark: "#000143"
        }, 
        tertiary: {
            main: "#00052a",
            light: "#00094d", 
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
        global: {
            navbarText: {
                main: "#fff"
            }, 
            verticalStepper: {
                labelText: {
                    main: "#fff"
                }
            }, 
            inputText: {
                main: "#fff"
            }, 
            textAreaCaption: {
                main: "#fff"
            }
        },
        registration: {
            linkColor: {
                main: blue[600], 
                light: blue[400]
            }, 
        }, 
        home: {
            itemBarTextColor: {
                main: "#969696"
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
            localPostsText: {
                main: "#fff"
            }
        }, 
        chats: {
            chatListText: {
                main: "#fff"
            }
        }, 
        postView: {
            slideButtons: {
                main: "#fff"
            }
        },
        settings: {
            text: {
                main: "#fff"
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
        }, 
        settings: {
            text: {
                fontSize: "1.3rem", 
                fontWeight: "600"
            }
        }
    }
})

export default darkTheme