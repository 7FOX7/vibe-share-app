import { useState } from "react"
import { useRef } from "react"
import { useComments } from "../../contexts/CommentsContext"
import { useAuth } from "../../contexts/AuthContext"
import { useLocation } from "react-router-dom"
import { commentMaxLength } from "../../data/inputMaxLength"
import { commentMaxRows } from "../../data/inputMaxRows"
import { useScreenSize } from "../../contexts/ScreenSizeContext"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import CustomTextArea from "../../customs/CustomTextArea"
import SendIcon from '@mui/icons-material/Send';

const InputField = ({id, type}) => {
    const [value, setValue] = useState(''); 
    const textAreaRef = useRef(''); 
    const {isSmallScreen} = useScreenSize(); 
    const location = useLocation(); 
    const formattedRoute = location.pathname.substring(1, location.pathname.length).split('/')[0]; 
    const {sendComments} = useComments(); 
    const {user} = useAuth(); 

    async function handleClick() {
        const content = textAreaRef.current.value; 
        const currentDate = new Date().toISOString().split('T')[0]
        const postData = {
            publishDate: currentDate, 
            author: user.username, 
            content: content, 
            id: id, 
            postType: type
        }
        await sendComments(postData)
    }

    function handleValueChange() {
        setValue(textAreaRef.current.value)
    }

    return (
        <>
            <Box sx={{
                position: "fixed", 
                top: "82%", 
                height: "18%", 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-around",
                backgroundColor: "white", 
                paddingTop: "10px", 
                paddingLeft: "5px"
            }}>
                <CustomTextArea
                    placeholder="Start typing here..." 
                    width="80%"
                    borderRadius="5px" 
                    border="1px solid" 
                    padding="4px 6px"
                    maxLength={commentMaxLength}
                    maxRows={commentMaxRows}
                    onChange={handleValueChange}
                    ref={textAreaRef}
                    route={formattedRoute}
                />
                <Avatar disabled={value.length === 0 || value.length === commentMaxLength} onClick={handleClick} sx={{
                    width: `${isSmallScreen ? "40px" : "50px"}`, 
                    height: `${isSmallScreen ? "40px" : "50px"}`,
                    border: "none", 
                    color: "contrastColors.white.main", 
                    backgroundColor: "primary.main",  
                    cursor: "pointer", 
                    paddingLeft: "10px", 
                    ":disabled": {
                        backgroundColor: "semiTransparentBlack.main", 
                        cursor: "default"
                    }
                }} component="button">
                    <SendIcon color="inherit" />
                </Avatar>
            </Box>
        </>
    )
}

export default InputField