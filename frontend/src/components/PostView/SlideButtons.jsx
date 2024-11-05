import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useTheme } from "@emotion/react";
import { memo } from "react";
import Box from "@mui/material/Box"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SlideButtons = memo(function ({handlePrevious, handleNext}) {
    const {isSmallScreen} = useScreenSize(); 
    const theme = useTheme(); 
    return (
        <Box sx={{
            width: `${isSmallScreen ? "93%" : "80%"}`, 
            position: "absolute", 
            top: "50%", 
            left: `${isSmallScreen ? "4%" : "10%"}`, 
            transform: "translateY(-50%)", 
            color: theme.palette.postView.slideButtons.main
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