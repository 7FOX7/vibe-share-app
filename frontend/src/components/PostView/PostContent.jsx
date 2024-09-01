import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const PostContent = ({post}) => {
    return (
        <>
            <Paper elevation={8} sx={{ 
                width: "100%", 
                height: "70%", 
                backgroundImage: `url(${post ? post.imageUrl : "/images/post_background_image__default.jpg"})`, 
                backgroundSize: "100% 100%", 
                backgroundRepeat: "no-repeat", 
                borderRadius: "10px",
                position: "relative"
            }}>
                <Box sx={{
                    position: "absolute", 
                    left: 0, 
                    top: 0, 
                    width: "100%", 
                    height: "100%", 
                    padding: "8px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    textAlign: "center"
                }}>
                    <Typography color="contrastColors.white.main" typography="postView.wideView">
                        {post.content}
                    </Typography>
                </Box>
            </Paper>
        </>
    )
}

export default PostContent