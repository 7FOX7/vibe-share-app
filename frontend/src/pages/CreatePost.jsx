import { useEffect } from "react"
import { Suspense, lazy } from "react"

const Box = lazy(() => import("@mui/material/Box")); 
const PostTemplate = lazy(() => import("../components/CreatePost/PostTemplate")); 

const CreatePost = () => {
    useEffect(() => {
        return () => {
            sessionStorage.clear()
        }
    }, [])

    return (
        <Suspense fallback={<div>Loading</div>}>
            <Box sx={{
                width: "100%", 
                height: "100vh", 
                backgroundColor: "secondary.main", 
                paddingInline: "10px", 
                paddingTop: "50px", 
                overflow: "hidden auto"
            }}>
                <PostTemplate />
            </Box>
        </Suspense>
    )
}

export default CreatePost