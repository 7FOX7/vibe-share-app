import { useState } from "react";
import { useEffect } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import ChatList from "./ChatList";
import axios from "axios";

const Container = () => {
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
        <>
            <ChatList chats={chats} />
        </>
    )
}

export default Container