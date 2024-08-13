import { useState } from "react";
import { Box, TextareaAutosize as TextArea, useMediaQuery, Typography } from "@mui/material"
import theme from "../theme/theme";

const maxLength = 90; 

const CustomTextArea = () => {
    const storedText = sessionStorage.getItem("text")
    const [textAreaValue, setTextAreaValue] = useState(storedText ? storedText : ""); 
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    const textAreaStyle = {
        width: `${smallScreen ? "80%" : "40%"}`, 
        border: "1px solid", 
        borderRadius: "5px", 
        outline: "none", 
        paddingInline: "7px", 
        paddingBlock: "4px", 
        resize: "none"
    }

    function handleTextAreaChange(e) {
        setTextAreaValue(e.currentTarget.value)
    }  

    function handleBlur(e) {
        sessionStorage.setItem("text", e.target.value)
    }

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column"
        }}>
            <TextArea style={textAreaStyle} maxRows={8} maxLength={maxLength} onChange={handleTextAreaChange} value={textAreaValue} onBlur={handleBlur} />
            <Typography variant="caption">
                {textAreaValue.length}/{maxLength}
            </Typography>
       </Box>
    )
}

export default CustomTextArea