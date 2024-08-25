import { useState } from "react"
import { useRef } from "react"
import { useComments } from "../../contexts/CommentsContext"
import { useAuth } from "../../contexts/AuthContext"
import CustomInput from "../../customs/CustomInput"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

const maxLength = 165; 

const InputField = ({id, postType}) => {
    const [input, setInput] = useState(""); 
    const inputRef = useRef(null); 
    const {sendComments} = useComments(); 
    const {user} = useAuth(); 

    async function handleClick() {
        const currentDate = new Date().toISOString().split('T')[0]
        const content = inputRef.current.value
        const postData = {
            publishDate: currentDate, 
            author: user.username, 
            content: content, 
            id: id, 
            postType: postType
        }
        await sendComments(postData)
    }

    function handleInput() {
        setInput(inputRef.current.value)
    }

    return (
        <Box sx={{
            position: "absolute", 
            top: "80%", 
            display: "flex", 
            alignItems: "center", 
            backgroundColor: "red", 
        }}>
            <CustomInput
                placeholder="Start typing here..." 
                width="85%"
                borderRadius="5px" 
                border="1px solid" 
                padding="4px 6px"
                onChange={handleInput}  
                ref={inputRef} 
            />
            <Button disabled={input === "" || input.length === maxLength} onClick={handleClick}>Send</Button>
        </Box>
    )
}

export default InputField