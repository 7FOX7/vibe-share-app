import { Suspense, lazy } from "react";
const Layer = lazy(() => import("../components/PostView/Layer"));
const Post = lazy(() => import("../components/PostView/Post"));

const PostView = () => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                <Layer>
                    <Post />
                </Layer>
            </Suspense>
        </>
    )
}

export default PostView
