import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import axios from "axios"

const ActionButtons = ({post, posts, setPosts}) => {
    async function handleLike() {
        if(post) {
            const data = {id: post.id}
            try {
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
                justifyContent: "space-around"
            }}>
                <Button sx={{
                    display: "flex", 
                    alignItems: "center", 
                    paddingBlock: "9px", 
                    paddingInline: "9%", 
                    backgroundColor: "tertiary.light",
                    borderRadius: "50px",
                    cursor: "pointer", 
                    ":hover": {
                        backgroundColor: "tertiary.main" 
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
                        backgroundColor: "tertiary.main" 
                    }
                }}>Chat</Button>
            </Box>
        </>
    )
}

export default ActionButtons


/*
    const array = [
        {id: 1, username: "john"}, 
        {id: 2, username: "mike"}, 
        {id: 3, username: "peter"}
    ]

    and I have an object: 
    
    const myObj = {id: 2, username: "pavel"}

    and I want to replace the object in the array which has id 2 with 'myObj', so the final result is: 

    const array = [
        {id: 1, username: "john"}, 
        {id: 2, username: "pavel"}, 
        {id: 3, username: "peter"}
    ]

    how can I do that?
*/