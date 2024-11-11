import { useState, createContext, useMemo, useEffect, useContext } from "react"; 
import { usePosts } from "./PostsContext";
import { useNavigate } from "react-router-dom";
import filterButtons from "../data/filterButtons";

const SelectedButtonContext = createContext(filterButtons[0].title); 

export const SelectedButtonProvider = ({children}) => {
    const {posts, setPosts, setGeolocationFilteredPosts} = usePosts(); 
    const [selectedButton, setSelectedButton] = useState(filterButtons[0].title); 
    const [sliderIsVisible, setSliderIsVisible] = useState(false); 
    const navigate = useNavigate(); 
    const postsCopy = useMemo(() => posts && [...posts], [posts])

    useEffect(() => {
        if(posts) {
            switch(selectedButton) {
                case "Popular": 
                    postsCopy.sort((currentPost, nextPost) => nextPost.likes - currentPost.likes)
                    setPosts(postsCopy)
                    setSliderIsVisible(false)
                    navigate("/", {relative: "route"})
                break; 
    
                case "Watch": 
                    navigate("/video-view", {relative: "route"})
                    setSliderIsVisible(false)
                break; 
    
                case "Recent": 
                    postsCopy.sort((currentPost, nextPost) => {
                        const currentPostDate = new Date(currentPost.publishDate); 
                        const nextPostDate = new Date(nextPost.publishDate); 
                        return (nextPostDate - currentPostDate)
                    })
                    setPosts(postsCopy)
                    setSliderIsVisible(false)
                    navigate("/", {relative: "route"})
                break; 
    
                case "Local": 
                    const isTrackingLocationAllowed = JSON.parse(localStorage.getItem("isTrackingLocationAllowed"))
                    if(!isTrackingLocationAllowed) {
                        setSliderIsVisible(false)
                        navigate("/ask-location", {relative: "route"})
                    }
                    else {
                        const filteredPosts = postsCopy.filter((post) => {
                            return post.latitude && post.longitude !== null 
                        })
                        setGeolocationFilteredPosts(filteredPosts)
                        setSliderIsVisible(true)
                        navigate("/", {relative: "route"})
                    }
                break; 
            } 
        }
    }, [selectedButton])
    
    return <SelectedButtonContext.Provider value={{selectedButton, setSelectedButton, sliderIsVisible}}>{children}</SelectedButtonContext.Provider>
}

export const useSelectedButton = () => {
    return useContext(SelectedButtonContext)
}