import { useComments } from "../contexts/CommentsContext"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

const CustomCommentsSection = () => {
    const {comments} = useComments(); 
    return (
        <>
            <Box>
                <Typography variant="h5">{comments.length} comments</Typography>
            </Box>
            {comments.length > 0 && comments.map((comment, index) => {
                const firstLetter = comment.author.charAt(0); 
                return (
                    <Paper key={index} elevation={3} sx={{
                        width: "90%", 
                        display: "flex", 
                        flexDirection: "column",
                        justifyContent: "space-between",  
                        padding: "15px", 
                        marginTop: "15px"
                    }}> 
                        <Box sx={{
                            display: "flex", 
                            alignItems: "center", 
                            marginBottom: "7px"
                        }}>
                            <Avatar sx={{backgroundColor: "primary.main", marginRight: "8px"}}>
                                {firstLetter}  
                            </Avatar>
                            <Box>
                                <Typography color="contrastColors.black.main" typography="commentSection.username">{comment.author}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: "90%"
                        }}>
                            <Typography color="contrastColors.black.main">{comment.content}</Typography>
                        </Box>
                    </Paper>
                )
            })}
        </>
    )   
}

export default CustomCommentsSection