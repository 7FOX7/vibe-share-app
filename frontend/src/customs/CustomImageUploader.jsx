import { useState, useRef } from "react";
import { Box, Fab, useMediaQuery } from "@mui/material"
import theme from "../theme/theme";
import AddIcon from '@mui/icons-material/Add';

const CustomImageUploader = () => {
    const storedImage = sessionStorage.getItem("image")
    const [backgroundImage, setBackgroundImage] = useState(storedImage ? storedImage : null); 
    const inputFileRef = useRef(null)
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 

    function handleClick() {
        inputFileRef.current.click()
    }

    function handleChange(e) {
        const file = e.target.files[0]
        if(file) {
            const imageUrl = URL.createObjectURL(e.target.files[0])
            sessionStorage.setItem("image", imageUrl)
            setBackgroundImage(imageUrl)
        }
    }
    return (
        <Box sx={{
            width: `${smallScreen ? "60%" : "22%"}`, 
            height: `${smallScreen ? "200px" : "215px"}`, 
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
                outline: `${storedImage ? "none" : "dashed 4px rgb(120, 120, 120)"}`, 
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