import { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext"

const ActionButtons = ({post, posts, setPosts}) => {
    const {user} = useAuth(); 
    const [backgroundColor, setBackgroundColor] = useState('tertiary.light'); 
    const [isLiked, setIsLiked] = useState(false); 

    useEffect(() => {
        setInitialBackgroundColor()
    }, [post])

    async function setInitialBackgroundColor() {
        const postIsLiked = await checkIfPostIsLiked()
        setIsLiked(postIsLiked)
        setBackgroundColor(postIsLiked ? "tertiary.main" : "tertiary.light")
    }

    async function checkIfPostIsLiked() {
        try {
            const response = await axios.get('http://localhost:8080/likes', {
                params: {
                    userId: user.id, 
                    postId: post.id
                }
            })
            return response.data
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

    async function handleLike() {
        if(post) {
            try {
                const data = {
                    userId: user.id, 
                    postId: post.id, 
                    isLiked: isLiked
                }
                const response = await axios.post('http://localhost:8080/likes', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const likes = await response.data[0].likes
                const updatedPost = {
                    ...post, 
                    likes: likes
                }
                const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post)
                setPosts(updatedPosts)
            }
            catch(err) {
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
    }

    return (
        <>
            <Box sx={{
                width: "100%", 
                display: "flex", 
                justifyContent: "space-evenly"
            }}>
                <Button sx={{
                    display: "flex", 
                    alignItems: "center", 
                    paddingBlock: "9px", 
                    paddingInline: "9%", 
                    backgroundColor: backgroundColor,
                    borderRadius: "50px",
                    cursor: "pointer", 
                    ":hover": {
                        backgroundColor: backgroundColor 
                    }
                }} onClick={handleLike}>Like {post.likes}</Button>
                <Button sx={{
                    display: "flex", 
                    alignItems: "center", 
                    paddingBlock: "9px", 
                    paddingInline: "9%", 
                    backgroundColor: "tertiary.light",
                    borderRadius: "50px",
                    cursor: "pointer", 
                    ":hover": {
                        backgroundColor: "tertiary.light" 
                    }
                }}>Chat</Button>
            </Box>
        </>
    )
}

export default ActionButtons

/*
    the problem: 
    we need to figure out: when the user is opening the post he already liked, he can see that the post is liked, 
    and those posts will be displayed in the 'liked' section


*/