function daysSinceLastPublish(publishDate) {
    const publishDateFormatted = new Date(publishDate);
    const currentDate = new Date(); 
    const differenceInTime = currentDate - publishDateFormatted;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
}

export default daysSinceLastPublish