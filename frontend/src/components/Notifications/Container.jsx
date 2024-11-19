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
    }, [])

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
                    <Stats />
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
                    <Stats />
                </Box>
            )
        }
    }, [isSmallScreen])

    return content
}

export default Container