import Box from "@mui/material/Box"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SlideButtons = ({handlePrevious, handleNext}) => {
    return (
        <Box sx={{
            width: "95%", 
            position: "absolute", 
            top: "50%", 
            left: "3%", 
            transform: "translateY(-50%)"
        }}>
            <Box sx={{
                width: "100%", 
                display: "flex", 
                justifyContent: "space-between"
            }}>
                <Box onClick={handlePrevious}>
                    <ArrowBackIosIcon />
                </Box>
                <Box onClick={handleNext}>
                    <ArrowForwardIosIcon />
                </Box>
            </Box>
        </Box>
    )
}

export default SlideButtons