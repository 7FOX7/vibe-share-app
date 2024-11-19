import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const PostPreview = () => {
    const storedImage = sessionStorage.getItem("image"); 
    const storedContent = sessionStorage.getItem("content"); 
    const {isSmallScreen} = useScreenSize()
    return (
        <Box sx={{
            position: "relative", 
            width: `${isSmallScreen ? "72%" : "28%"}`, 
            height: `${isSmallScreen ? "220px" : "265px"}`,
            overflow: "hidden"
        }}>
            <Box sx={{
                width: "100%", 
                height: "100%", 
                borderRadius: "10px", 
                backgroundImage: `url(${storedImage ? storedImage : "/images/default-field.webp"})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "100% 100%", 
            }} />
            <Box sx={{
                position: "absolute", 
                left: 0, 
                top: 0, 
                width: "100%", 
                height: "100%", 
                padding: "4px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                textAlign: "center"
            }}>
                <Typography color="contrastColors.black.main" typography="createPost.postPreview">
                    {storedContent ? storedContent : ""}
                </Typography>
            </Box>
        </Box>
    )
}

export default PostPreview