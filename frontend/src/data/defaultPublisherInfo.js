import formatMySqlDate from "../utils/functions/formatMySqlDate";

const currentDate = formatMySqlDate(new Date()); 

const defaultPublisherInfo = [
    {
        publishDate: currentDate, 
        username: "video_owned_by" 
    }
]

export default defaultPublisherInfo