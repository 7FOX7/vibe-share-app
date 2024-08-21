import { ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import Box from "@mui/material/Box"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../../theme/theme";
import { usePosts } from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../contexts/RouteContext";
import daysSinceLastPublish from "../../functionalities/daysSinceLastPublish";

const Posts = () => {
    const {setRoute} = useRoute(); 
    const navigate = useNavigate(); 
    const {posts} = usePosts();    
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 

    function handleOpen(id, username) {
        setRoute('post-view')
        navigate(`/post-view/${id}/${username}`, {relative: "route"})
    }

    return (
        <Box>
            <ImageList cols={smallScreen ? 2 : 4} gap={8} sx={{ 
                width: "100%",   
                overflow: "hidden"
            }}>
                {posts && posts.map((post) => {
                    return (
                        <ImageListItem key={post.id} id={post.id} onClick={() => handleOpen(post.id, post.username)} sx={{
                            cursor: "pointer", 
                            overflow: "hidden"
                        }}>
                            <Box component="img" src={`${post.imageUrl}`} sx={{
                                width: "100%", 
                                height: `${smallScreen ? "220px" : "265px"}`, 
                                borderRadius: "10px"
                            }} />
                            {/* <Box sx={{
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
                            <Typography color="contrastColors.white.main" typography="postText">
                                {post.content}
                            </Typography>
                            </Box> */}
                            <ImageListItemBar 
                                title={
                                    <Box sx={{
                                        display: "flex", 
                                        justifyContent: "space-around"
                                    }}>
                                        <Box>
                                            <Typography color="itemBarTextColor.main">❤️ {post.likes}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color="itemBarTextColor.main">🕒 {daysSinceLastPublish(post.publishDate)}d</Typography>
                                        </Box>
                                    </Box>
                                }
                                position="below"
                                subtitle={
                                    <Typography variant="body2">by {post.username}</Typography>
                                } 
                            />
                        </ImageListItem>
                    )
                })}
            </ImageList> 
        </Box>      
    )
}

export default Posts