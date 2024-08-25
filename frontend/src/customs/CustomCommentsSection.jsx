import { useComments } from "../contexts/CommentsContext"
import InputField from "../components/CommentSection/InputField"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

const top = "20%"; 

const CustomCommentsSection = ({id, postType}) => {
    const {comments} = useComments()
    return (
        <Box sx={{
            position: "absolute", 
            width: "100%", 
            height: "100%"
        }}>
            <Paper elevation={2} sx={{
                position: "absolute", 
                top: top, 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",  
                width: "100%", 
                height: "80%", 
                padding: "10px", 
                zIndex: "5", 
            }}>
                <Box>
                    <Typography variant="h5">{comments.length} comments</Typography>
                </Box>
                {comments.length > 0 && comments.map((comment, index) => {
                    const firstLetter = comment.author.charAt(0); 
                    return (
                        <Box key={index} sx={{
                            width: "100%", 
                            height: "20%",
                            display: "flex", 
                            flexDirection: "column",
                            justifyContent: "space-between",  
                            marginBottom: "25px"
                        }}>
                            <Box sx={{
                                display: "flex", 
                                width: "30%", 
                                justifyContent: "space-between", 
                                alignItems: "center"
                            }}>
                                <Avatar sx={{backgroundColor: "primary.main"}}>
                                    {firstLetter}  
                                </Avatar>
                                <Box>
                                    <Typography color="contrastColors.black.main" typography="publisherInfo.username">{comment.author}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography color="contrastColors.black.main">{comment.content}</Typography>
                            </Box>
                            <Divider flexItem />
                        </Box>
                    )
                })}
            </Paper>
            <InputField id={id} postType={postType} />
        </Box>
    )   
}

export default CustomCommentsSection