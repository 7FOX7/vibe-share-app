import Box from "@mui/material/Box"
import InputSection from "../components/Registration/InputSection"

const Login = () => {
  return (
    <Box sx={{
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      paddingTop: "50px", 
      paddingBottom: "10px", 
      paddingInline: "10px"}}>
        <InputSection />
    </Box>
  )
}

export default Login