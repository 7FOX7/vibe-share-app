import { useScreenHeight } from "../../contexts/ScreenHeightContext"; 
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";

const PublisherInfo = ({videos}) => {
    const publishDate = videos[0].publishDate; 
    const username = videos[0].username; 
    const top = `${Math.floor(useScreenHeight() - 140)}px`; 
    return (
            <Box sx={{
                position: "absolute",
                top: top, 
                left: 0, 
                width: "100%", 
                height: "90px", 
        }}>
            <Box sx={{ 
                width: "100%", 
                height: "100%", 
                backgroundColor: "primary.dark",
                opacity: "0.6", 
            }} />
            <Box sx={{
                position: "absolute", 
                top: 0, 
                left: 0, 
                display: "flex", 
                flexDirection: "column",
                justifyContent: "space-evenly",  
                width: "100%", 
                height: "100%", 
                zIndex: "10", 
                padding: "5px 10px"
            }}>
                <Box>
                    <Typography typography="publisherInfo.username" color="contrastColors.white.main">{username}</Typography>
                </Box>
                <Box>
                    <Typography typography="publisherInfo.publishDate" color="contrastColors.white.main">{publishDate}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default PublisherInfo