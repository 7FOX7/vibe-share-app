import { useNavigate } from "react-router-dom";
import CustomContainer from "../../customs/CustomContainer";
import defaultPublisherInfo from "../../data/defaultPublisherInfo";
import ChatIcon from '@mui/icons-material/Chat';
import formatPublishDate from "../../utils/functions/formatPublishDate";

const type = "video"

const PublisherInfo = ({videos}) => {
    const navigate = useNavigate(); 
    const content = videos.length === 0 ? defaultPublisherInfo : videos; 
    const publishDate = formatPublishDate(content[0].publishDate); 
    const username = content[0].username; 

    function handleClick() {
        const id = content[0].id; 
        const author = content[0].username; 
        navigate(`/comments/${type}/${id}/${author}`)
    }
    
    return (
        <CustomContainer mainText={username} addText={publishDate} onClick={handleClick} icon={<ChatIcon />} />
    )
}

export default PublisherInfo