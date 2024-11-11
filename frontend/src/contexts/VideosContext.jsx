import { useState, createContext, useContext } from "react";
import _axios from "../../axios.config";

const VideosContext = createContext([]); 

export const VideosProvider = ({children}) => {
    const [videos, setVideos] = useState([]); 

    async function fetchVideos() {
        try {
            const response = await _axios.get('/videos'); 
            for(let val of response.data) {
                val.username = val.username.username
            }
            setVideos(response.data)
            console.error('videos were fetched successfully: ' +  response.statusText)
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.error('Something is wrong with the client')
            }
            else {
                console.error(err)
            }
        }
    }

    return <VideosContext.Provider value={{videos, fetchVideos}}>{children}</VideosContext.Provider>
}

export const useVideos = () => {
    return useContext(VideosContext)
}