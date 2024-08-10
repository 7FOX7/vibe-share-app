import { Box, Paper, BottomNavigation, BottomNavigationAction, Fab, useMediaQuery } from "@mui/material"
import theme from "../theme/theme";
import { useScreenHeight } from "../contexts/ScreenHeightContext"
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TelegramIcon from '@mui/icons-material/Telegram';
import AddIcon from '@mui/icons-material/Add';

const CustomNavBar = () => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    const top = `${Math.floor(useScreenHeight() - 55)}px`; 
    return (
        <Paper sx={{position: "fixed", width: "100vw", top: {top}, backgroundColor: "secondary.dark"}} elevation={4}>
            <Box sx={{position: "fixed", bottom: "4%", left: `${smallScreen ? "42.5%" : "48%"}`}}>
                <Fab color="primary">
                    <AddIcon fontSize="large" />
                </Fab>
            </Box>
            <BottomNavigation showLabels sx={{backgroundColor: "inherit"}}>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Groups" icon={<GroupsIcon />} />
                <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
                <BottomNavigationAction label="Chats" icon={<TelegramIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default CustomNavBar