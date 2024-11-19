import Box from "@mui/material/Box"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from "@mui/material/Typography";
import authorAppBar from "../../data/authorAppBar";

const AppBarContent =  {
    notifications: () => {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center" 
            }}>
                <Typography typography="global.appBar">My Account</Typography>
            </Box>
        )
    }, 
    chats: () => {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center" 
            }}>
                <Typography typography="global.appBar">My Chats</Typography>
            </Box>
        )
    }, 
    clubs: () => {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center" 
            }}>
                <Typography typography="global.appBar">My Clubs</Typography>
            </Box>
        )
    }, 
    default: ({goBack, formattedRoute, author}) => {
        return (
            <>
                <Box onClick={goBack} sx={{
                    display: "flex", 
                    alignSelf: "start", 
                    alignItems: "center", 
                    cursor: "pointer"
                }}>
                    <ArrowBackIosIcon />
                    {authorAppBar.includes(formattedRoute) && 
                        <Typography typography="global.appBar">
                            {author}
                        </Typography>
                    }
                </Box>
            </>
        )
    }, 
}

export default AppBarContent