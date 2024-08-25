import { Suspense, lazy } from "react";
const Layer = lazy(() => import("../components/PostView/Layer"));

const PostView = () => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                <Layer />
            </Suspense>
        </>
    )
}

export default PostView
