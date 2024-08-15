import { Box, Paper, BottomNavigation, BottomNavigationAction, Fab, useMediaQuery } from "@mui/material"
import theme from "../theme/theme";
import { useScreenHeight } from "../contexts/ScreenHeightContext"
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TelegramIcon from '@mui/icons-material/Telegram';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { usePostMode } from "../contexts/PostModeContext";

const CustomNavBar = () => {
    const {setPostMode} = usePostMode(); 
    const navigate = useNavigate(); 
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    const top = `${Math.floor(useScreenHeight() - 55)}px`; 

    function changePostMode() {
        setPostMode(true)
        navigate("/create-post", {relative: "route"})
    }

    return (
        <Paper sx={{position: "fixed", width: "100vw", top: {top}, backgroundColor: "secondary.dark"}} elevation={4}>
            <Box sx={{position: "fixed", bottom: "4%", left: `${smallScreen ? "42.5%" : "48%"}`}}>
                <Fab color="primary" onClick={changePostMode}>
                    <AddIcon fontSize="large" />
                </Fab>
            </Box>
            <BottomNavigation showLabels sx={{backgroundColor: "inherit", justifyContent: "space-around"}}>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Groups" icon={<GroupsIcon />} />
                <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
                <BottomNavigationAction label="Chats" icon={<TelegramIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default CustomNavBar

/*
    PROBLEM: allow users create a new post. 

    WHAT WE NEED: 
    1. A button by clicking on which a new window will open and the user can create a post in it.
    2. A window that will open on click
    3. The window will contain the default text that the user can change. 
    4. A new window will also contain the option to change the font family. 
    5. There will be a button to change a background image. 
    6. After that a user can create a post and that post will be then stored and extracted a db; 
    
    PROCEDURE: 
    1. 
*/