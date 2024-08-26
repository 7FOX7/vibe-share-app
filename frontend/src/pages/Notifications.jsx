import { Box } from "@mui/material"
import { useEffect, useState } from "react"
// TODO: lazy load the components


const Notifications = () => {
    const [location, setLocation] = useState(null);
    
    if(location) {
        console.log(location)
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords; 
            setLocation({latitude, longitude}); 
        }, 
        (error) => {
            console.log('there was an error when getting the location: ' + error)
        })
    }, [])

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "blue"
        }}></Box>
    )
}

export default Notifications

/*
    how our code can look like when targeting a location: 

    when the app is first launching: 

    const [location, setLocation] useState(null); 

    useEffect(() => {
        navigator.geolocation.getPosition((position) => {
            const {latitude, longitude} = position.coords; 
            setLocation({latitude, longitude})    
        })    
    })

    
    on POST: 

    const postData = {
        id: id, 
        publishDate: currentDate, 
        likes: 0, 
        latitude: latitude, 
        longitude: longitude
    }

    on GET: 

    we have a 'posts' which contains all the posts including latitude and longitude; 

    so, when we click on local button we get the following: 
    
    
*/