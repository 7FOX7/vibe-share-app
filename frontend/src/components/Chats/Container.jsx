import { useState } from "react";
import { useEffect } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useTheme } from "@emotion/react";
import ChatList from "./ChatList";
import axios from "axios";
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
            const response = await axios.get('http://localhost:8080/chats', {
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
                console.log('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.log('Something is wrong with the client: ' + err)
            }
            else {
                console.log(err)
            }
        }
    }

    return (
        <Box sx={{
            width: `${isSmallScreen ? "100%" : "50%"}`, 
            color: theme.palette.chats.chatListText.main
        }}>
            <ChatList chats={chats} />
        </Box>
    )
}

export default Container