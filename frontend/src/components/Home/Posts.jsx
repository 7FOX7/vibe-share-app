import { usePosts } from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../contexts/RouteContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import daysSinceLastPublish from "../../functionalities/daysSinceLastPublish";

const Posts = () => {
    const {setRoute} = useRoute(); 
    const navigate = useNavigate(); 
    const {posts} = usePosts();    
    const {isSmallScreen} = useScreenSize();  

    function handleOpen(id, username) {
        setRoute('post-view')
        navigate(`/post-view/${id}/${username}`, {relative: "route"})
    }

    return (
        <Box>
            <ImageList cols={isSmallScreen ? 2 : 4} gap={8} sx={{ 
                width: "100%",   
                overflow: "hidden"
            }}>
                {posts && posts.map((post) => {
                    return (
                        <ImageListItem 
                            key={post.id} 
                            id={post.id} 
                            onClick={() => handleOpen(post.id, post.username)} 
                            sx={{
                                cursor: "pointer", 
                                overflow: "hidden"
                            }
                        }>
                            <Box 
                                component="img" 
                                src={`${post.imageUrl}`} 
                                loading="lazy"
                                sx={{
                                    width: "100%", 
                                    height: `${isSmallScreen ? "220px" : "265px"}`, 
                                    borderRadius: "10px"
                                }} 
                            />
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