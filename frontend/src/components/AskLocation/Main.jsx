import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Buttons from "./Buttons";

const Main = () => {
    const {isSmallScreen} = useScreenSize(); 
    return (
        <Box sx={{
            width: "100%", 
            height: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            marginTop: `${isSmallScreen ? "10%" : "25px"}`
        }}>
            <Box sx={{
                width: `${isSmallScreen ? "80%" : "38%"}`, 
                height: `${isSmallScreen ? "35%" : "40%"}`, 
                backgroundImage: "url(/images/map.png)", 
                backgroundSize: "100% 100%", 
                backgroundRepeat: "no-repeat"
            }} />
            <Box sx={{
                width: `${isSmallScreen ? "80%" : "50%"}`, 
                height: `${isSmallScreen ? "35%" : "30%"}`, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center"
            }}>
                <Box>
                    <LocationOnIcon fontSize="large" />
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Typography variant="h4">Turn on Location</Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Typography variant="caption">Your location is turned off. Click on the button below To turn on location.</Typography>
                </Box>
            </Box>
            <Buttons />
        </Box>
    )
}

export default Main