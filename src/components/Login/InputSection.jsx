import Box from "@mui/material/Box"
import CustomInput from "../../customs/CustomInput"
import theme from "../../theme/theme"

function InputSection() {
  return (
    <Box component="form" sx={{
        flex: "1 1 auto", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
    }}>
        <CustomInput placeholder="Enter username" />
        <CustomInput placeholder="Enter password" />
    </Box>
  )
}

export default InputSection