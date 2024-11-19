import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { usePosts } from "../../contexts/PostsContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useSelectedButton } from "../../contexts/SelectedButtonContext";
import Box from "@mui/material/Box";
import Post from "./Post";
import { usePostAuthor } from "../../contexts/PostAuthorContext";

const PostWrapper = () => {
    const {posts, setPosts, geolocationFilteredPosts, setGeolocationFilteredPosts} = usePosts();
    const {selectedButton} = useSelectedButton(); 
    const {id} = useParams(); 
    const [index, setIndex] = useState(Number(id)); 
    const {isSmallScreen} = useScreenSize(); 
    const navigate = useNavigate(); 
    const {setAuthor} = usePostAuthor()

    const currentPosts = selectedButton === "Local" ? geolocationFilteredPosts : posts

    const post = useMemo(() => {
        const post = currentPosts.find(_post => _post.id === index)
        if(typeof(post) !== "undefined") return post
    }, [index, currentPosts])

    useEffect(() => {
        navigate(`/post-view/${post.id}/${post.username}`, {relative: "route"})
    }, [index])

    const handlePrevious = useCallback(() => {
        const currentIndex = currentPosts.findIndex(_post => _post.id === index);
        if (currentIndex > 0) {
            setIndex(currentPosts[currentIndex - 1].id);
            setAuthor(currentPosts[currentIndex - 1].username)
        }
    }, [index])

    const handleNext = useCallback(() => {
        const currentIndex = currentPosts.findIndex(_post => _post.id === index);
        if (currentIndex < currentPosts.length - 1) {
            setIndex(currentPosts[currentIndex + 1].id);
            setAuthor(currentPosts[currentIndex + 1].username)
        }
    }, [index])

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "space-evenly", 
            width: `${isSmallScreen ? "92%" : "50%"}`, 
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