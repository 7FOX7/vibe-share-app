import { useMemo } from "react";
import PostContent from "./PostContent";
import ActionButtons from "./ActionButtons";
import SlideButtons from "./SlideButtons";

const Post = ({posts, setPosts, post, handlePrevious, handleNext}) => {
    const slideButtons = useMemo(() => {
        return <SlideButtons handlePrevious={handlePrevious} handleNext={handleNext} />
    }, [])

    return (
        <>
            {slideButtons}
            <PostContent post={post} />
            <ActionButtons post={post} posts={posts} setPosts={setPosts} />
        </>   
    )
}

export default Post