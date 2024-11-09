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
import CustomModal from "../../customs/CustomModal"; 
import SendIcon from '@mui/icons-material/Send';
import formatMySqlDate from "../../utils/functions/formatMySqlDate"; 

const message = "Comment was sent sucessfully!"; 

const InputField = ({id, type}) => {
    const [open, setOpen] = useState(false); 
    const [value, setValue] = useState(''); 
    const textAreaRef = useRef(''); 
    const {isSmallScreen} = useScreenSize(); 
    const location = useLocation(); 
    const formattedRoute = location.pathname.substring(1, location.pathname.length).split('/')[0]; 
    const {sendComments} = useComments(); 
    const {user} = useAuth(); 

    async function handleClick() {
        try {
            const content = textAreaRef.current.value; 
            const currentDate = formatMySqlDate(new Date());  
            const postData = {
                publishDate: currentDate, 
                content: content, 
                id: id, 
                userId: user.id, 
                postType: type
            }
            textAreaRef.current.value = ""
            sendComments(postData)
        }
        catch (err) {
            console.log('There was an error when sending a comment')
        }
        finally {
            setOpen(true)
        }
    }

    function handleValueChange() {
        setValue(textAreaRef.current.value)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            <CustomModal open={open} handleClose={handleClose} message={message} />
            <Box sx={{
                position: "fixed", 
                top: `${isSmallScreen ? "82%" : "86%"}`, 
                height: `${isSmallScreen ? "18%" : "14%"}`, 
                width: "100%", 
                display: "flex", 
                justifyContent: "center", 
                backgroundColor: "white", 
                paddingTop: "10px", 
                paddingLeft: "5px"
            }}>
                <Box sx={{
                    width: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: `${isSmallScreen ? "space-around" : "center"}`, 
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
                        width: `${isSmallScreen ? "40px" : "45px"}`, 
                        height: `${isSmallScreen ? "40px" : "45px"}`,
                        border: "none", 
                        color: "contrastColors.white.main", 
                        backgroundColor: "primary.main",  
                        cursor: "pointer", 
                        paddingLeft: "10px", 
                        marginLeft: `${isSmallScreen ? 0 : "30px"}`, 
                        ":disabled": {
                            backgroundColor: "semiTransparentBlack.main", 
                            cursor: "default"
                        }
                    }} component="button">
                        <SendIcon color="inherit" />
                    </Avatar>
                </Box>
            </Box>
        </>
    )
}

export default InputField