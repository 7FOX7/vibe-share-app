import { memo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SlideButtons = memo(function ({handlePrevious, handleNext}) {
    console.log('Slide buttons was rerendered')
    const {isSmallScreen} = useScreenSize(); 
    return (
        <Box sx={{
            width: `${isSmallScreen ? "93%" : "80%"}`, 
            position: "absolute", 
            top: "50%", 
            left: `${isSmallScreen ? "4%" : "10%"}`, 
            transform: "translateY(-50%)"
        }}>
            <Box sx={{
                width: "100%", 
                display: "flex", 
                justifyContent: "space-between"
            }}>
                <Box onClick={handlePrevious} sx={{
                    cursor: "pointer"
                }}>
                    <ArrowBackIosIcon />
                </Box>
                <Box onClick={handleNext} sx={{
                    cursor: "pointer"
                }}>
                    <ArrowForwardIosIcon />
                </Box>
            </Box>
        </Box>
    )
})

export default SlideButtons