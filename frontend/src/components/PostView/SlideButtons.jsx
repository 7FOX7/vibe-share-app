import Box from "@mui/material/Box"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../theme/theme";

const SlideButtons = ({handlePrevious, handleNext}) => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    return (
        <Box sx={{
            width: `${smallScreen ? "93%" : "80%"}`, 
            position: "absolute", 
            top: "50%", 
            left: `${smallScreen ? "4%" : "10%"}`, 
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
}

export default SlideButtons