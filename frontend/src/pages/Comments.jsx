import { Suspense, lazy } from "react";

const CommentSection = lazy(() => import("../components/Comments/CommentSection")); 
const Box = lazy(() => import("@mui/material/Box")); 

const Comments = () => {
    return (
        <Suspense falback={<div>Loading</div>}>
            <Box sx={{
            width: "100%", 
            height: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            paddingInline: "10px",
            backgroundColor: "contrastColors.white.main",  
            paddingTop: "70px", 
            }}>
                <CommentSection />
            </Box>
        </Suspense>
    )
}

export default Comments