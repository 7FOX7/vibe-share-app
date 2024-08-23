import Box from "@mui/material/Box"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../theme/theme";

const CustomButton = ({id, title, icon}) => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    const buttonStyle = {
        width: `${smallScreen ? "auto" : "fit-content"}`, 
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "contrastColors.white.main", 
        border: "1px solid", 
        borderColor: "contrastColors.black.main", 
        color: "semiTransparentBlack.main", 
        fontFamily: "inherit", 
        paddingBlock: "7px",  
        paddingInline: `${smallScreen ? "0" : "14px"}`, 
        flex: `${smallScreen ? "0.2 1 auto" : "none"}`,
        borderRadius: "50px",
        cursor: "pointer"
    }

    return (
        <Box id={id} sx={buttonStyle} component="button">
            {title}
            <Box sx={{marginLeft: "2px", color: "contrastColors.white.main"}} component="span">{icon}</Box>
        </Box>
    )
}

export default CustomButton