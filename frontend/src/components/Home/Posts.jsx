import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Box from "@mui/material/Box"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../../theme/theme";

const Posts = () => {  
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 
    return (
        <Box>
            <ImageList cols={smallScreen ? 2 : 4} gap={6} sx={{ 
            width: "100%",   
            overflow: "hidden"
            }}>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                    <ImageListItemBar title="hello" />
                </ImageListItem>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                </ImageListItem>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                </ImageListItem>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                </ImageListItem>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                </ImageListItem>
                <ImageListItem>
                    <Box component="img" src="../../../public/images/IMG_6948.JPG" sx={{
                        width: "100%", 
                        height: `${smallScreen ? "200px" : "215px"}`
                    }} />
                </ImageListItem>
            </ImageList>  
        </Box>      
    )
}

export default Posts

/*
    1. assuming we will have a TABLE named 'posts' with the following COLUMNS: 

    id - INT
    publish_date - CURRENT_DATE
    content - VARCHAR(120)
    image_url - IMAGE_SOURCE
    likes_amount - INT
    shares_amount - INT

    1. the way im going to get ALL posts and display them on the home page: 
    
    (frontend): 
    const response = await axios.get('/home')
    setPosts(response.data); 

    ...
    posts.map((post) => {
        <Box sx={{backgroundImage: post.postImage}}>
            <Box>
                post.postContent
            </Box>
        <Box>
    })

    (backend): 
    app.get('/home', (req, res) => {
        const q = "SELECT * FROM posts.posts"; 
        db.query(q, (err, data) => {
            if(err) {
                res.json('Error occured: ' + err)
                return
            }    
            res.json(data)
        })
    })

    2. we need to figure out the way we are going to store images in db: 
    but first we need to find out how we are going to generate those images
    
    when clicking on 'create posts' the following will happen; 
    we ask the user to choose an image by: 


*/