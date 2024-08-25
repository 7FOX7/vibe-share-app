import { useVideos } from "../../contexts/VideosContext";
import PublisherInfo from "./PublisherInfo";
import defaultVideoUrl from "../../data/defaultVideoUrl";

const VideoFragment = () => {
    const {videos} = useVideos(); 
    const videoUrl = videos.length === 0 ? defaultVideoUrl : videos[0].videoUrl;
     
    return (
        <>
            <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <PublisherInfo videos={videos} />
        </>
    )
}

export default VideoFragment