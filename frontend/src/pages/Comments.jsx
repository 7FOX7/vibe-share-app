import Box from "@mui/material/Box";
import CommentSection from "../components/Comments/CommentSection";

const Comments = () => {
    return (
        <Box sx={{
            width: "100%", 
            height: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            paddingInline: "10px",
            backgroundColor: "contrastColors.white.main",  
            paddingTop: "70px", 
        }}>
            <CommentSection />
        </Box>
    )
}

export default Comments