import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../../theme/theme";

const Layer = ({children}) => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    return (
        <Box sx={{
            backgroundColor: "secondary.main", 
            display: "flex", 
            justifyContent: "center", 
            width: "100vw", 
            height: "100vh", 
            paddingInline: `${smallScreen ? "50px" : "80px"}`, 
            paddingTop: "50px"
        }}>
            <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "space-evenly", 
                width: `${smallScreen ? "100%" : "55%"}`, 
                height: "100%"
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default Layer; 