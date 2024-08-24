import { Suspense, lazy } from "react";

const Box = lazy(() => import("@mui/material/Box")); 
const VideoFragment = lazy(() => import("../components/VideoView/VideoFragment")); 

const VideoView = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Box sx={{ 
        backgroundColor: "secondary.main", 
        width: "100vw", 
        height: "100vh", 
        paddingInline: "10px", 
        paddingTop: "50px", 
      }}>
        <VideoFragment />
      </Box>
    </Suspense>
  )
}

export default VideoView