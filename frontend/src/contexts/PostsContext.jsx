
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const PostsContext = createContext(null)

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8080/posts"); 
            setPosts(response.data)
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

    return <PostsContext.Provider value={{posts, setPosts}}>{children}</PostsContext.Provider>
}

export const usePosts = () => {
    return useContext(PostsContext)
}