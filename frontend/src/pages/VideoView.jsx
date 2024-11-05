import { Suspense, lazy, useEffect } from "react";
import { useVideos } from "../contexts/VideosContext";

const Box = lazy(() => import("@mui/material/Box")); 
const VideoFragment = lazy(() => import("../components/VideoView/VideoFragment")); 

const VideoView = () => {
  const {fetchVideos} = useVideos(); 
  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Box sx={{ 
        width: "100%", 
        height: "100vh",  
        paddingTop: "50px", 
        overflow: "hidden auto"
      }}>
        <VideoFragment />
      </Box>
    </Suspense>
  )
}

export default VideoView