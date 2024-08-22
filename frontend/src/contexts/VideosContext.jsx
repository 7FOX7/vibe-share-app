import { createContext, useContext, useState } from "react";
import axios from "axios";

const VideosContext = createContext(null); 

export const VideosProvider = ({children}) => {
    const [videos, setVideos] = useState(null); 

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:8080/videos'); 
            setVideos(response.data)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    return <VideosContext.Provider value={{videos, fetchData}}>{children}</VideosContext.Provider>
}

export const useVideos = () => {
    return useContext(VideosContext)
}