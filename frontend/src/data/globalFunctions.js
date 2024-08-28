import calculateDistance from "../utils/calculateDistance";

export function handleSliderChange(e, posts, setGeolocationFilteredPosts, geolocation) {
    const currentUserGeolocation = geolocation; 
    const currentSliderValue = e.target.value;
    const filteredPosts = posts.filter((post) => {
        return post.latitude && post.longitude !== null 
    })

    const matchingGeolocationPosts = filteredPosts.filter((post) => {
        const postGeolocation = {"latitude": post.latitude, "longitude": post.longitude}
        const distance = calculateDistance(currentUserGeolocation, postGeolocation)
        console.log('the distance is: ' + Math.floor(distance / 1000))
        return distance <= currentSliderValue
    })

    setGeolocationFilteredPosts(matchingGeolocationPosts)
    // const moscowGeolocation = {"latitude": 43.651070, "longitude": -79.347015}
    // const newYorkGeolocation = {"latitude": 40.730610, "longitude": -73.935242}
    // const distance = calculateDistance(moscowGeolocation, newYorkGeolocation)
    // console.log('The distance between two cities in meters: ' + Math.floor(distance / 1000))
}

const globalFunctions = [
    {   
        handleSliderChange
    }
]

export default globalFunctions

/*
    assuming 'posts' will only be changed when we are fetching/set likes to the post

*/