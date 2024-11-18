import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const PasswordStrengthBar = ({displayerColor, fillness, passwordMessage, displayerVisibility}) => {
  return (
    <>
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
        overflow: "hidden", 
        marginTop: "12px"
      }}>
        <Typography color={displayerColor}>{passwordMessage}</Typography>
      </Box>
    </>
  )
}

export default PasswordStrengthBar