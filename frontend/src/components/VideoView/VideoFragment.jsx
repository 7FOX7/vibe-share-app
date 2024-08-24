import { useVideos } from "../../contexts/VideosContext";
import PublisherInfo from "./PublisherInfo";
import Box from "@mui/material/Box";

const defaultVideoUrl = "https://www.youtube.com/embed/yxTNZdirshQ?autoplay=1"

const VideoFragment = () => {
    const {videos} = useVideos(); 
    const videoUrl = videos.length === 0 ? defaultVideoUrl : videos[0].videoUrl;
     
    return (
        <>
            <Box sx={{
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                overflow: "hidden"
            }}>
                <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <PublisherInfo videos={videos} />
            </Box>
        </>
    )
}

export default VideoFragment