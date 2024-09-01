import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import axios from "axios"

const type = "post"

const ActionButtons = ({post, posts, geolocationFilteredPosts, setPosts, setGeolocationFilteredPosts}) => {
    const {user} = useAuth(); 
    const navigate = useNavigate(); 
    const [backgroundColor, setBackgroundColor] = useState('tertiary.light'); 
    const [isLiked, setIsLiked] = useState(false); 

    useEffect(() => {
        console.log(`when LIKE button is clicked, posts are rerendered => post we clicked on is rerendered, too!`)
        setInitialBackgroundColor()
    }, [post])

    async function setInitialBackgroundColor() {
        const data = await checkIfPostIsLiked()
        const postIsLiked = data.length !== 0
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
                const updatedGeolocationPosts = geolocationFilteredPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
                setPosts(updatedPosts)
                setGeolocationFilteredPosts(updatedGeolocationPosts)
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
    }

    async function handleComments() {
        const id = post.id; 
        const author = post.username; 
        navigate(`/comments/${type}/${id}/${author}`)
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
                }} onClick={handleComments}>Chat</Button>
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