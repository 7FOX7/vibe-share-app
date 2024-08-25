import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";
import defaultPublisherInfo from "../../data/defaultPublisherInfo";

const PublisherInfo = ({videos}) => {
    const {screenHeight} = useScreenSize(); 
    const content = videos.length === 0 ? defaultPublisherInfo : videos; 
    const publishDate = content[0].publishDate; 
    const username = content[0].username; 
    const top = `${Math.floor(screenHeight - 140)}px`; 
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