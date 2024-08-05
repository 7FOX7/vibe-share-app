import Box from "@mui/material/Box"
import WelcomeSection from "../components/Login/WelcomeSection"
import InputSection from "../components/Login/InputSection"

function Login() {
  return (
    <Box sx={{
      display: "flex", 
      flexDirection: "column",
      width: "100vw", 
      height: "100vh", 
      paddingTop: "50px", 
      paddingBottom: "10px", 
      paddingInline: "10px"}}>
        <WelcomeSection />
        <InputSection />
    </Box>
  )
}

export default Login