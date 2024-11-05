import { useScreenSize } from "../../contexts/ScreenSizeContext"
import { useTheme } from "@emotion/react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Main = () => {
    const {isSmallScreen} = useScreenSize();
    const theme = useTheme();  
    return (
        <Box sx={{
            width: "100%", 
            height: "100%", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            marginTop: "25px"
        }}>
            <Box sx={{
                width: `${isSmallScreen ? "100%" : "45%"}`,
                height: `${isSmallScreen ? "40%" : "50%"}`, 
                backgroundImage: "url(/images/settings_temporary_background.png)", 
                backgroundSize: "100% 100%", 
                backgroundRepeat: "no-repeat", 
                marginBottom: "50px"
            }} />
            <Box sx={{
                textAlign: "center"
            }}>
                <Typography typography={theme.typography.settings.text} sx={{color: theme.palette.settings.text.main}}>We are actively working on this page!</Typography>
            </Box>
        </Box>
    )
}

export default Main