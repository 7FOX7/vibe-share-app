import { usePosts } from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { usePostAuthor } from "../../contexts/PostAuthorContext";
import { useSelectedButton } from "../../contexts/SelectedButtonContext";
import Box from "@mui/material/Box"; 
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import formatPostPublishDate from "../../utils/functions/formatPostPublishDate";
import { useTheme } from "@emotion/react";

const Posts = () => { 
    const navigate = useNavigate(); 
    const {selectedButton} = useSelectedButton(); 
    const {posts, geolocationFilteredPosts} = usePosts();   
    const currentPosts = selectedButton === "Local" ? geolocationFilteredPosts : posts 
    const {isSmallScreen} = useScreenSize();  
    const {setAuthor} = usePostAuthor(); 
    const theme = useTheme(); 

    function handleOpen(id, username) {
        setAuthor(username)
        navigate(`/post-view/${id}/${username}`, {relative: "route"})
    }

    return (
        <Box sx={{
            marginBottom: "40px"
        }}>
            <ImageList cols={isSmallScreen ? 2 : 4} gap={10} sx={{ 
                width: "100%",   
                overflow: "hidden"
            }}>
                {currentPosts && currentPosts.map((post) => {
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
                                sx={{
                                    color: theme.palette.home.itemBarTextColor.main
                                }}
                                title={
                                    <Box sx={{
                                        display: "flex", 
                                        justifyContent: "space-around"
                                    }}>
                                        <Box>
                                            <Typography>❤️ {post.likes}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography>🕒 {formatPostPublishDate(post.publishDate)}</Typography>
                                        </Box>
                                    </Box>
                                }
                                position="below"
                                subtitle={
                                    <Typography variant="body2" color="primary">by {post.username}</Typography>
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

