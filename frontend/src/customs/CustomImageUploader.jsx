import { useState } from "react";
import { useRef } from "react";
import { useScreenSize } from "../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import Fab from "@mui/material/Fab"; 
import AddIcon from '@mui/icons-material/Add';
import arrayBufferToBase64 from "../utils/functions/arrayBufferToBase64";

const CustomImageUploader = () => {
    const storedImage = sessionStorage.getItem("image")
    const [backgroundImage, setBackgroundImage] = useState(storedImage ? storedImage : null); 
    const inputFileRef = useRef(null); 
    const {isSmallScreen} = useScreenSize(); 

    function handleClick() {
        inputFileRef.current.click()
    }

    function handleChange(e) {
        const file = e.target.files[0]
        if(file) {
            const fileName = file.name; 
            const imageUrl = URL.createObjectURL(file)
            setBackgroundImage(imageUrl)
            sessionStorage.setItem('image', imageUrl)
            const reader = new FileReader(); 
            reader.onloadend = () => {
                const arrayBuffer = reader.result
                const base64 = arrayBufferToBase64(arrayBuffer)
                const fileData = JSON.stringify({base64, fileName})
                sessionStorage.setItem('fileData', fileData)
            }
            reader.readAsArrayBuffer(file)
        }
    }
    return (
        <Box sx={{
            width: `${isSmallScreen ? "72%" : "28%"}`, 
            height: `${isSmallScreen ? "220px" : "265px"}`, 
        }}>
            <Box sx={{
                position: "relative", 
                width: "100%", 
                height: "100%", 
                borderRadius: "10px", 
                backgroundColor: "rgb(235, 235, 250)",
                backgroundImage: `url(${backgroundImage ? backgroundImage : ""})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "100% 100%", 
                outline: `${backgroundImage ? "none" : "dashed 4px rgb(120, 120, 120)"}`, 
                outlineOffset: "-4px", 
            }}>
                <Box sx={{
                    position: "relative",
                    left: "7%", 
                    top: "84%",  
                    float: "right"
                }}>
                    <Fab color="primary" size="small" onClick={handleClick}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <input 
                type="file"
                accept="image/*"
                onChange={handleChange} 
                ref={inputFileRef} 
                style={{display: "none"}} />
        </Box>
    )
}

export default CustomImageUploader