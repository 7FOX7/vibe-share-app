import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Box from "@mui/material/Box"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../../theme/theme";
import { usePosts } from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../contexts/RouteContext";

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
            <ImageList cols={smallScreen ? 2 : 4} gap={6} sx={{ 
                width: "100%",   
                overflow: "hidden"
            }}>
                {posts && posts.map((post) => {
                    return (
                        <ImageListItem key={post.id} id={post.id} onClick={() => handleOpen(post.id, post.username)}>
                            <Box component="img" src={`${post.imageUrl}`} sx={{
                                width: "100%", 
                                height: `${smallScreen ? "200px" : "215px"}`
                            }} />
                            <ImageListItemBar title={`${post.username}`} />
                        </ImageListItem>
                    )
                })}
            </ImageList> 
        </Box>      
    )
}

export default Posts

/*
    <Box>
        {open ? 
        <> 
            <PostPage params/>
        </> : 
        <ImageList cols={smallScreen ? 2 : 4} gap={6} sx={{ 
            width: "100%",   
            overflow: "hidden"
        }}>
            {posts && posts.map((post, index) => {
                return (
                    <ImageListItem key={index} id={index} onClick={() => handleOpen(index)}>
                        <Box component="img" src={`${post.imageUrl}`} sx={{
                            width: "100%", 
                            height: `${smallScreen ? "200px" : "215px"}`
                        }} />
                        <ImageListItemBar title={`${post.username}`} />
                    </ImageListItem>
                )
            })}
        </ImageList> } 
    </Box> 
*/