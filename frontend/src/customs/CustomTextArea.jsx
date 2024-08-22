import { useState } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextareaAutosize as TextArea, Typography } from "@mui/material"; 
import theme from "../theme/theme";

const maxLength = 90; 

const CustomTextArea = ({placeholder, width, border, background, color, minRows}) => {
    const storedContent = sessionStorage.getItem("content")
    const [textAreaValue, setTextAreaValue] = useState(storedContent ? storedContent : ""); 
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    const textAreaStyle = { 
        border: border, 
        borderRadius: "5px", 
        outline: "none", 
        padding: "10px", 
        fontSize: "1rem", 
        resize: "none", 
        background: background, 
        color: color
    }

    function handleTextAreaChange(e) {
        setTextAreaValue(e.currentTarget.value)
    }  

    function handleBlur(e) {
        sessionStorage.setItem("content", e.target.value)
    }

    return (
        <Box sx={{
            width: `${smallScreen ? width : "40%"}`,
            display: "flex", 
            flexDirection: "column"
        }}>
            <TextArea style={textAreaStyle} minRows={minRows} maxLength={maxLength} onChange={handleTextAreaChange} value={textAreaValue} onBlur={handleBlur} placeholder={placeholder} />
            <Typography variant="caption">
                {textAreaValue.length}/{maxLength}
            </Typography>
       </Box>
    )
}

export default CustomTextArea