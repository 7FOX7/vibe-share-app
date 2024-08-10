import { Box, Button, useMediaQuery, Typography } from "@mui/material"
import theme from "../../theme/theme"

const BottomSection = ({displayerColor, fillness, passwordMessage, onClick, formComplete, displayerVisibility}) => {
  const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
  return (
    <Box sx={{
      width: `${smallScreen ? "75%" : "25%"}`,
      display: "flex", 
      flexDirection: "column", 
    }}>
        <Box sx={{ 
        width: "100%",  
        border: "1px solid rgb(50, 50, 50)", 
        borderRadius: "5px", 
        height: "10px", 
        visibility: displayerVisibility
    }}>
          <Box sx={{
              width: fillness,  
              background: displayerColor, 
              height: "100%", 
              borderRadius: "5px"
          }} />
        </Box>
      <Box sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",  
        height: "100px", 
        overflow: "hidden"
      }}>
        <Typography color={displayerColor}>{passwordMessage}</Typography>
      </Box>
      <Button onClick={onClick} type="submit" disabled={!formComplete} sx={{ 
        marginTop: "25px", 
        background: "#000", 
        color: "contrastColors.white.main", 
        borderRadius: "50px",
        transition: "0.5s", 
        ":hover": {
          background: "rgb(80, 80, 80)",
        }, 
        "&:after": {
          content: `${!formComplete ? "none" : "''"}`, 
          borderRadius: "50px",
          width: "105%", 
          height: "130%", 
          position: "absolute", 
          left: "5",  
          top: "5", 
          background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)", 
          zIndex: "-1"
        }, 
        ":disabled": {
          background: "rgba(0, 0, 0, 0.15)",
          cursor: "not-allowed", 
          border: "none", 
        }
      }}>
        Join!
      </Button>
    </Box>
  )
}

export default BottomSection