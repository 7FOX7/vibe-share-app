import { useState } from "react";
import { useEffect } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import ChatList from "./ChatList";
import axios from "axios";
import Box from "@mui/material/Box";

const Container = () => {
    const {isSmallScreen} = useScreenSize(); 
    const [chats, setChats] = useState(null); 
    const {user} = useAuth(); 
    
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
            width: `${isSmallScreen ? "100%" : "50%"}`
        }}>
            <ChatList chats={chats} />
        </Box>
    )
}

export default Container