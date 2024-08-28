import { useMemo } from "react";
import PostContent from "./PostContent";
import ActionButtons from "./ActionButtons";
import SlideButtons from "./SlideButtons";

const Post = ({posts, geolocationFilteredPosts, setPosts, setGeolocationFilteredPosts, post, handlePrevious, handleNext}) => {
    const slideButtons = useMemo(() => {
        return <SlideButtons handlePrevious={handlePrevious} handleNext={handleNext} />
    }, [])

    return (
        <>
            <SlideButtons handlePrevious={handlePrevious} handleNext={handleNext} />
            <PostContent post={post} />
            <ActionButtons post={post} posts={posts} geolocationFilteredPosts={geolocationFilteredPosts} setPosts={setPosts} setGeolocationFilteredPosts={setGeolocationFilteredPosts} />
        </>   
    )
}

export default Post