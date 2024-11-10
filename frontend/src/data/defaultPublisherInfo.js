import formatSqlDate from "../utils/functions/formatSqlDate";

const currentDate = formatSqlDate(new Date()); 

const defaultPublisherInfo = [
    {
        id: 118, 
        publishDate: currentDate, 
        username: "best_user" 
    }
]

export default defaultPublisherInfo