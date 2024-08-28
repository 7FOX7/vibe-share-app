
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const PostsContext = createContext(null)

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState(null);
    const [geolocationFilteredPosts, setGeolocationFilteredPosts] = useState(null); 
    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        try {
            const response = await axios.get("http://localhost:8080/posts"); 
            setPosts(response.data)
            setGeolocationFilteredPosts(response.data)
            console.log('posts were fetched successfully: ' +  response.statusText)
        }
        catch(err) {
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

    return <PostsContext.Provider value={{posts, setPosts, geolocationFilteredPosts, setGeolocationFilteredPosts}}>{children}</PostsContext.Provider>
}

export const usePosts = () => {
    return useContext(PostsContext)
}