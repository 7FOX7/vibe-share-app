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
                <Typography variant="h5">{comments.length} {comments.length === 1 ? "comment" : "comments"}</Typography>
            </Box>
            {comments.length > 0 && comments.map((comment) => {
                const firstLetter = comment.username ? comment.username.charAt(0) : '1' 
                return (
                    <Paper key={comment.id} elevation={3} sx={{
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
                                <Typography color="contrastColors.black.main" typography="customCommentsSection.username">{comment.username}</Typography>
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