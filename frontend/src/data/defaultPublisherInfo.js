const currentDate = new Date().toISOString().split('T')[0]; 

const defaultPublisherInfo = [
    {
        publishDate: currentDate, 
        username: "video_owned_by" 
    }
]

export default defaultPublisherInfo