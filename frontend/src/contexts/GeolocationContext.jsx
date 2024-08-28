import { useState, useEffect, createContext, useContext } from "react"; 

const GeolocationContext = createContext(null); 

export const GeolocationProvider = ({children}) => {
    const [geolocation, setGeolocation] = useState(null); 
    const [isTrackingLocationAllowed, setIsTrackingLocationAllowed] = useState(JSON.parse(localStorage.getItem('isTrackingLocationAllowed')) || null)
    if(geolocation) {
        const lat = geolocation.latitude; 
        const lon = geolocation.longitude

        console.log('Tracking was allowed. Here is geolocation data: lat: ' + lat + ' lon: ' + lon)
    }
    useEffect(() => {
        if(!isTrackingLocationAllowed) {
            localStorage.setItem('isTrackingLocationAllowed', false)
        }
        else {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                setGeolocation({latitude, longitude})
            }, (err) => {
                console.log('There was an error when getting a position: ' + err)
            })
        }
    }, [isTrackingLocationAllowed])

    return <GeolocationContext.Provider value={{geolocation, isTrackingLocationAllowed, setIsTrackingLocationAllowed}}>{children}</GeolocationContext.Provider>
}

export const useGeolocation = () => {
    return useContext(GeolocationContext)
}