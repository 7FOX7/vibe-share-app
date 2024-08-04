import { Box, Button, useMediaQuery, Typography } from "@mui/material"
import theme from "../../theme/theme"

function BottomSection({displayerColor, fillness, passwordMessage, onClick}) {
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));  

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
        height: "10px"
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
      <Button onClick={onClick} type="submit" sx={{ 
        marginTop: "25px", 
        background: "red"
      }}>
        Login
      </Button>
    </Box>
  )
}

export default BottomSection