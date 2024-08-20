import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { usePosts } from "../../contexts/PostsContext";
import Paper from "@mui/material/Paper";
import ActionButtons from "./ActionButtons";
import SlideButtons from "./SlideButtons";

const Post = () => {
    const {posts, setPosts} = usePosts();
    const {id} = useParams(); 
    const [index, setIndex] = useState(Number(id)); 
    const navigate = useNavigate(); 

    const post = useMemo(() => {
        const post = posts.find(_post => _post.id === index)
        if(typeof(post) !== "undefined") {
            return post
        }
        return
    }, [index, posts])

    const slideButtons = useMemo(() => {
        return <SlideButtons handlePrevious={handlePrevious} handleNext={handleNext} />
    }, [])

    // const actionButtons = useMemo(() => {
    //     return <ActionButtons post={post} posts={posts} setPosts={setPosts} />
    // }, [posts])

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
        <>
            {slideButtons}
            <Paper elevation={1} sx={{ 
                width: "100%", 
                height: "70%", 
                backgroundImage: `url(${post ? post.imageUrl : "/images/post_background_image__default.jpg"})`, 
                backgroundSize: "100% 100%", 
                backgroundRepeat: "no-repeat"
            }} />
            <ActionButtons post={post} posts={posts} setPosts={setPosts} />
        </>
    )
}

export default Post

/*
    LIKES

    1. userId   2. postId
    
*/