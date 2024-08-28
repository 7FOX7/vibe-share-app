import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { usePosts } from "../../contexts/PostsContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useSelectedButton } from "../../contexts/SelectedButtonContext";
import Box from "@mui/material/Box";
import Post from "./Post";

const PostWrapper = () => {
    const {posts, setPosts, geolocationFilteredPosts, setGeolocationFilteredPosts} = usePosts();
    const {selectedButton} = useSelectedButton(); 
    const currentPosts = selectedButton === "Local" ? geolocationFilteredPosts : posts
    const {id} = useParams(); 
    const [index, setIndex] = useState(Number(id)); 
    const {isSmallScreen} = useScreenSize(); 
    const navigate = useNavigate(); 

    const post = useMemo(() => {
        const post = currentPosts.find(_post => _post.id === index)
        if(typeof(post) !== "undefined") {
            return post
        }
        return
    }, [index, currentPosts])

    useEffect(() => {
        navigate(`/post-view/${post.id}/${post.username}`, {relative: "route"})
    }, [index])

    function handlePrevious() {
        const currentIndex = currentPosts.findIndex(_post => _post.id === index);
        if (currentIndex > 0) {
            setIndex(currentPosts[currentIndex - 1].id);
        }
    }

    function handleNext() {
        const currentIndex = currentPosts.findIndex(_post => _post.id === index);
        if (currentIndex < currentPosts.length - 1) {
            setIndex(currentPosts[currentIndex + 1].id);
        }
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
                geolocationFilteredPosts={geolocationFilteredPosts}
                setPosts={setPosts}
                setGeolocationFilteredPosts={setGeolocationFilteredPosts}
                post={post}
                handlePrevious={handlePrevious} 
                handleNext={handleNext} 
            />
        </Box> 
    )
}

export default PostWrapper