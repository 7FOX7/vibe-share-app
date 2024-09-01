import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import Box from "@mui/material/Box"; 
import Stats from "./Stats"; 
import LocalPosts from "./LocalPosts";
import Footnote from "./Footnote";
import axios from "axios";

const Container = () => {
    const {posts, setGeolocationFilteredPosts} = usePosts(); 
    const [likedPosts, setLikedPosts] = useState([]); 
    const {user} = useAuth(); 

    useEffect(() => {
        const filteredPosts = posts.filter((post) => {
            return post.latitude && post.longitude !== null 
        })
        setGeolocationFilteredPosts(filteredPosts)
    }, [])

    useEffect(() => {
        console.log('you are fetching liked posts')
        fetchLikedPosts()
    }, [])

    async function fetchLikedPosts() {
        try {
            const response = await axios.get('http://localhost:8080/likes', {
                params: {
                    userId: user.id, 
                    getAll: true
                }
            })
            setLikedPosts(response.data)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.log('Something is wrong with the client: ' + err)
            }
            else {
                console.log(err)
            }
        }
    }

    return (
        <Box sx={{
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
        }}>
            <Stats likedPosts={likedPosts} />
            <LocalPosts />
            <Footnote />
        </Box>
    )
}

export default Container