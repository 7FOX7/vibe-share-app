import PostContent from "./PostContent";
import ActionButtons from "./ActionButtons";
import SlideButtons from "./SlideButtons";

const Post = ({posts, geolocationFilteredPosts, setPosts, setGeolocationFilteredPosts, post, handlePrevious, handleNext}) => {

    return (
        <>
            <SlideButtons handlePrevious={handlePrevious} handleNext={handleNext} />
            <PostContent post={post} />
            <ActionButtons post={post} posts={posts} geolocationFilteredPosts={geolocationFilteredPosts} setPosts={setPosts} setGeolocationFilteredPosts={setGeolocationFilteredPosts} />
        </>   
    )
}

export default Post