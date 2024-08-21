import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { usePosts } from "../../contexts/PostsContext";
import PostContent from "./PostContent";
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
            <PostContent post={post} />
            <ActionButtons post={post} posts={posts} setPosts={setPosts} />
        </>
    )
}

export default Post