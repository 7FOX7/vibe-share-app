import Box from "@mui/material/Box"
import WelcomeSection from "../components/Registration/WelcomeSection"
import InputSection from "../components/Registration/InputSection"

const Registration = () => {
  return (
    <Box sx={{
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        paddingTop: "50px", 
        paddingBottom: "10px", 
        paddingInline: "10px",
        overflow: "hidden auto"
      }}
    >
        <WelcomeSection />
        <InputSection />
    </Box>
  )
}

export default Registration