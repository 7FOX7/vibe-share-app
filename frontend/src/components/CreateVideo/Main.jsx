import { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Box from "@mui/material/Box"; 
import PostButton from "./PostButton"; 
import InputFields from "./InputFields";
import CustomModal from "../../customs/CustomModal";
import youtubeRegex from "../../data/youtubeRegex";
import axios from "axios";

const Main = () => {
    const urlInputRef = useRef(""); 
    const [open, setOpen] = useState(false); 
    const [message, setMessage] = useState(null); 
    const {user} = useAuth(); 

    function isValidUrl(url) {
        return youtubeRegex.test(url)
    }

    function handleClose() {
        setOpen(false)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = urlInputRef.current.value; 
        if(isValidUrl(url)) {
            const videoId = url.match(youtubeRegex)[1]
            const formattedVideoId = videoId.split('?')[0]
            const formattedVideoUrl = `https://www.youtube.com/embed/${formattedVideoId}?autoplay=1`
            const currentDate = new Date().toISOString().split('T')[0]
            const data = {
                publishDate: currentDate, 
                videoUrl: formattedVideoUrl, 
                username: user.username, 
            }
            try {
                const response = await axios.post('http://localhost:8080/videos', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }); 
                setMessage(response.data)
                setOpen(true) 
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
            finally {
                urlInputRef.current.value = ""
            }
        } 
        else {
            alert('Url is Not Valid!')
        }
    }

    return (
        <>
            <CustomModal open={open} handleClose={handleClose} message={message} />
            <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-evenly", 
                alignItems: "center", 
                width: "100%", 
                height: "100%"
            }} component="form" autoComplete="off">
                <InputFields urlInputRef={urlInputRef} />
                <PostButton handleSubmit={handleSubmit} />
            </Box>
        </>
    )
}

export default Main