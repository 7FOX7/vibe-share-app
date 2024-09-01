import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PostButton = ({handleSubmit}) => {
    return (
        <Box>
            <Button sx={{
                backgroundColor: "primary.dark", 
                paddingInline: "12px", 
                paddingBlock: "8px", 
                ":hover": {
                    backgroundColor: "primary.dark"
                }
            }} type="submit" onClick={handleSubmit}>
                <Typography color="contrastColors.white.main" typography="createVideo.postButton">Post</Typography>
            </Button>
        </Box>
    )
}

export default PostButton