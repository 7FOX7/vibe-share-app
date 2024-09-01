import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import Stats from "./Stats"; 
import LocalPosts from "./LocalPosts";
import Footnote from "./Footnote";
import axios from "axios";

const Container = () => {
    const {isSmallScreen} = useScreenSize(); 
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

    const content = useMemo(() => {
        if(isSmallScreen) {
            return (
                <Box sx={{
                    width: "100%", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                    <Stats likedPosts={likedPosts} />
                    <LocalPosts />
                    <Footnote />
                </Box>
            )
        }
        else {
            return (
                <Box sx={{
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "space-between"
                }}>
                    <LocalPosts />
                    <Stats likedPosts={likedPosts} />
                </Box>
            )
        }
    }, [likedPosts, isSmallScreen])

    return content
}

export default Container