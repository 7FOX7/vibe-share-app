
import { useState, useEffect, createContext, useContext } from "react";
import _axios from "../../axios.config";

const PostsContext = createContext(null)

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState(null);
    const [geolocationFilteredPosts, setGeolocationFilteredPosts] = useState(null); 
    
    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        try {
            const response = await _axios.get("/posts");
            for(let val of response.data) {
                val.username = val.username.username
            }
            setPosts(response.data)
            setGeolocationFilteredPosts(response.data)
        }
        catch(err) {
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

    return <PostsContext.Provider value={{posts, setPosts, geolocationFilteredPosts, setGeolocationFilteredPosts}}>{children}</PostsContext.Provider>
}

export const usePosts = () => {
    return useContext(PostsContext)
}