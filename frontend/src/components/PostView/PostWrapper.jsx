import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { usePosts } from "../../contexts/PostsContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box";
import Post from "./Post";

const PostWrapper = () => {
    const {posts, setPosts} = usePosts();
    const {id} = useParams(); 
    const [index, setIndex] = useState(Number(id)); 
    const {isSmallScreen} = useScreenSize(); 
    const navigate = useNavigate(); 

    const post = useMemo(() => {
        const post = posts.find(_post => _post.id === index)
        if(typeof(post) !== "undefined") {
            return post
        }
        return
    }, [index, posts])

    useEffect(() => {
        navigate(`/post-view/${post.id}/${post.username}`, {relative: "route"})
    }, [index])

    function handlePrevious() {
        setIndex((prevIndex) => prevIndex === 1 ? prevIndex : prevIndex - 1)
    }

    function handleNext() {
        setIndex((prevIndex) => prevIndex === posts.length ? prevIndex : prevIndex + 1)
    }

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "space-evenly", 
            width: `${isSmallScreen ? "100%" : "55%"}`, 
            height: "100%"
        }}>
            <Post 
                posts={posts}
                setPosts={setPosts}
                post={post}
                handlePrevious={handlePrevious} 
                handleNext={handleNext} 
            />
        </Box> 
    )
}

export default PostWrapper