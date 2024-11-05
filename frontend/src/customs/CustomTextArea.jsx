import { useState } from "react";
import { forwardRef } from "react"; 
import { useScreenSize } from "../contexts/ScreenSizeContext";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import { TextareaAutosize as TextArea } from "@mui/material";
import Typography from "@mui/material/Typography"; 

const CustomTextArea = forwardRef(function CustomTextArea(props, ref) {
    const storedContent = sessionStorage.getItem("content")
    const [textAreaValue, setTextAreaValue] = useState(storedContent ? storedContent : ""); 
    const {isSmallScreen} = useScreenSize();  
    const theme = useTheme(); 
    const textAreaStyle = { 
        border: props.border, 
        borderRadius: "5px", 
        outline: "none", 
        padding: "10px", 
        fontSize: "1rem", 
        resize: "none", 
        background: props.background, 
        color: props.color
    }

    function handleTextAreaChange(e) {
        setTextAreaValue(e.currentTarget.value)
    }  

    function handleBlur(e) {
        sessionStorage.setItem("content", e.target.value)
    }

    return (
        <Box sx={{
            width: `${isSmallScreen ? props.width : "40%"}`,
            display: "flex", 
            flexDirection: "column"
        }}>
            {props.route === "comments" ? 
            <>
                <TextArea style={textAreaStyle} minRows={props.minRows} maxLength={props.maxLength} maxRows={props.maxRows} onChange={props.onChange} placeholder={props.placeholder} ref={ref} />
            </>
            : 
            <>
                <TextArea style={textAreaStyle} minRows={props.minRows} maxLength={props.maxLength} maxRows={props.maxRows} onChange={handleTextAreaChange} value={textAreaValue} onBlur={handleBlur} placeholder={props.placeholder} ref={ref} />
                <Typography variant="caption" sx={{marginTop: "10px", color: theme.palette.global.textAreaCaption.main}}>
                    {textAreaValue.length}/{props.maxLength}
                </Typography> 
            </>
            }
       </Box>
    )
}) 

export default CustomTextArea