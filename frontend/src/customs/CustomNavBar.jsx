import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../contexts/ScreenSizeContext";
import { useSelectedButton } from "../contexts/SelectedButtonContext";
import { useAuth } from "../contexts/AuthContext";
import { useClubs } from "../contexts/ClubsContext";
import Box from "@mui/material/Box"; 
import Paper from "@mui/material/Paper"; 
import BottomNavigation from "@mui/material/BottomNavigation"; 
import BottomNavigationAction from "@mui/material/BottomNavigationAction"; 
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TelegramIcon from '@mui/icons-material/Telegram';
import AddIcon from '@mui/icons-material/Add';

const CustomNavBar = () => {
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate(); 
    const {selectedButton} = useSelectedButton(); 
    const {screenHeight, isSmallScreen} = useScreenSize(); 
    const {user} = useAuth(); 
    const {fetchClubIds} = useClubs(); 
    const top = `${Math.floor(screenHeight - 55)}px`; 

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    async function changeRoute(e) {
        const id = e.currentTarget.id
        const routeName = id.split('N')[0]
        if(!routeName) {
            navigate(`/non-existing-page`, {relative: "route"})
            return
        }
        if(routeName === 'home') {
            selectedButton === "Watch" ? navigate('/video-view', {relative: "route"}) : navigate('/', {relative: "route"})
            return
        }
        else if(routeName === 'clubs') {
            await fetchClubIds(user.id)
        }
        navigate(`/${routeName}`, {relative: "route"})
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <Typography variant="span" typography="mainContent">
                    <DialogTitle>Post Create Options</DialogTitle>
                    <List>
                        <ListItem>
                            <ListItemButton id="create-postNavigation" onClick={changeRoute}>Create Post</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton id="create-videoNavigation" onClick={changeRoute}>Create Embedded Video</ListItemButton>
                        </ListItem>
                    </List>
                </Typography>
            </Dialog>
            <Paper elevation={4} sx={{
                position: "fixed", 
                width: "100vw", 
                top: {top}, 
                backgroundColor: "secondary.dark", 
                zIndex: "20"
            }}>
                <Box sx={{position: "fixed", bottom: "4%", left: `${isSmallScreen ? "42.5%" : "48%"}`}}>
                    <Fab color="primary" onClick={handleOpen}>
                        <AddIcon fontSize="large" />
                    </Fab>
                </Box>
                <BottomNavigation showLabels sx={{backgroundColor: "inherit", justifyContent: "space-around"}}>
                    <BottomNavigationAction id="homeNavigation" onClick={changeRoute} label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction id="clubsNavigation" onClick={changeRoute} label="Clubs" icon={<GroupsIcon />} />
                    <BottomNavigationAction id="notificationsNavigation" onClick={changeRoute} label="Notifications" icon={<NotificationsIcon />} />
                    <BottomNavigationAction id="chatsNavigation" onClick={changeRoute} label="Chats" icon={<TelegramIcon />} />
                </BottomNavigation>
            </Paper>
        </>
    )
}

export default CustomNavBar