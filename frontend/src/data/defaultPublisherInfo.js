import formatMySqlDate from "../utils/functions/formatMySqlDate";

const currentDate = formatMySqlDate(new Date()); 

const defaultPublisherInfo = [
    {
        id: 118, 
        publishDate: currentDate, 
        username: "best_user" 
    }
]

export default defaultPublisherInfo