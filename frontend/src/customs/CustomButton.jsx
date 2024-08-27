import { useScreenSize } from "../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 

const CustomButton = ({id, title, width="fit-content", border="1px solid", backgroundColor, fontSize, icon, onClick}) => {
    const {isSmallScreen} = useScreenSize(); 
    const buttonStyle = {
        width: width, 
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: backgroundColor, 
        border: border, 
        borderColor: "contrastColors.black.main", 
        color: "semiTransparentBlack.main", 
        fontFamily: "inherit", 
        paddingBlock: "7px",  
        paddingInline: `${isSmallScreen ? "0" : "14px"}`, 
        flex: `${isSmallScreen ? "0.2 1 auto" : "none"}`,
        borderRadius: "50px",
        fontSize: fontSize, 
        cursor: "pointer"
    }

    return (
        <Box id={id} sx={buttonStyle} component="button" onClick={onClick}>
            {title}
            <Box sx={{marginLeft: "2px", color: "contrastColors.white.main"}} component="span">{icon}</Box>
        </Box>
    )
}

export default CustomButton