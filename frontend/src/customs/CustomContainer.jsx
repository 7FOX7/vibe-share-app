import { useScreenSize } from "../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomContainer = ({mainText, addText, onClick, icon}) => {
    const {isSmallScreen, screenHeight} = useScreenSize(); 
    const top = `${Math.floor(screenHeight - 140)}px`; 
    return (
        <Box sx={{
            position: "absolute",
            top: top, 
            left: 0, 
            width: "100%", 
            height: "90px",
            overflow: "hidden",  
            zIndex: "10"
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
                padding: "8px 18px"
            }}>
                <Box>
                    <Typography typography="customContainer.mainText" color="contrastColors.white.main">{mainText}</Typography>
                </Box>
                <Box>
                    <Typography typography="customContainer.addText" color="contrastColors.white.main">{addText}</Typography>
                </Box>
            </Box>
            <Box sx={{
                position: "absolute", 
                left: `${isSmallScreen ? "80%" : "90%"}`, 
                top: "25%", 
            }}>
                <Button onClick={onClick} sx={{
                    color: "contrastColors.white.main"
                }}>
                    {icon}
                </Button>
            </Box>
        </Box>
    )
}

export default CustomContainer