import { useState } from "react";
import { useEffect } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useTheme } from "@emotion/react";
import _axios from "../../../axios.config";
import ChatList from "./ChatList";
import Box from "@mui/material/Box";

const Container = () => {
    const {isSmallScreen} = useScreenSize(); 
    const [chats, setChats] = useState(null); 
    const {user} = useAuth(); 
    const theme = useTheme(); 
    
    useEffect(() => {
        fetchChats()
    }, [])

    async function fetchChats() {
        try {
            const response = await _axios.get('/chats', {
                params: {
                    userId: user.id, 
                }
            })
            for(let val of response.data) {
                if(val.authorId) val.authorId = val.authorId.id
                if(val.authorUsername) val.authorUsername = val.authorUsername.username
                if(val.imageUrl) val.imageUrl = val.imageUrl.imageUrl
            }
            setChats(response.data)
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.error('Something is wrong with the client: ' + err)
            }
            else {
                console.error(err)
            }
        }
    }

    return (
        <Box sx={{
            width: `${isSmallScreen ? "100%" : "50%"}`, 
            color: theme.palette.chats.chatListText.main, 
            marginBottom: "50px"
        }}>
            <ChatList chats={chats} />
        </Box>
    )
}

export default Container