import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useClubs } from "../../contexts/ClubsContext";
import Box from "@mui/material/Box"; 
import Stats from "./Stats"; 
import LocalPosts from "./LocalPosts";
import Footnote from "./Footnote";
import _axios from "../../../axios.config";

const Container = () => {
    const {isSmallScreen} = useScreenSize(); 
    const {posts, setGeolocationFilteredPosts} = usePosts(); 
    const [likedPosts, setLikedPosts] = useState([]); 
    const {user} = useAuth(); 
    const {fetchClubIds} = useClubs(); 

    useEffect(() => {
        const filteredPosts = posts.filter((post) => {
            return post.latitude && post.longitude !== null 
        })
        setGeolocationFilteredPosts(filteredPosts)
    }, [])

    useEffect(() => {
        fetchClubIds(user.id)
        fetchLikedPosts()
    }, [])

    async function fetchLikedPosts() {
        try {
            const response = await _axios.get('/likes', {
                params: {
                    userId: user.id, 
                    getCount: true
                }
            })
            setLikedPosts(response.data)
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.error('Something is wrong with the client: ' + err)
            }
            else {
                console.error(err)
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
                    alignItems: "center", 
                    marginBottom: "80px"
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
                    justifyContent: "space-between", 
                    marginBottom: "50px"
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