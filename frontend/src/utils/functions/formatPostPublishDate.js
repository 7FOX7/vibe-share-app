function formatPostPublishDate(publishDate) {
    const now = new Date();
    const published = new Date(publishDate);
    const seconds = Math.floor((now - published) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (days >= 30) {
        return `${months}mon`;
    } 

    else if (days > 0) {
        return `${days}d`;
    } 

    else if (hours > 0) {
        return `${hours}h`;
    } 

    else if (minutes > 0) {
        return `${minutes}min`;
    } 

    else {
        return `${seconds}s`;
    }
}

export default formatPostPublishDate