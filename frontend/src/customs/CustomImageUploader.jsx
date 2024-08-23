import { useState } from "react";
import { useRef } from "react";
import Box from "@mui/material/Box"; 
import Fab from "@mui/material/Fab"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import theme from "../theme/theme";
import AddIcon from '@mui/icons-material/Add';
import arrayBufferToBase64 from "../functionalities/arrayBufferToBase64";

const CustomImageUploader = () => {
    const storedImage = sessionStorage.getItem("image")
    const [backgroundImage, setBackgroundImage] = useState(storedImage ? storedImage : null); 
    const inputFileRef = useRef(null)
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 

    function handleClick() {
        inputFileRef.current.click()
    }

    function handleChange(e) {
        const file = e.target.files[0]
        if(file) {
            const fileName = file.name; 
            const imageUrl = URL.createObjectURL(file)
            setBackgroundImage(imageUrl)
            sessionStorage.setItem('image', imageUrl)
            const reader = new FileReader(); 
            reader.onloadend = () => {
                const arrayBuffer = reader.result
                const base64 = arrayBufferToBase64(arrayBuffer)
                const fileData = JSON.stringify({base64, fileName})
                sessionStorage.setItem('fileData', fileData)
            }
            reader.readAsArrayBuffer(file)
            // try {
            //     const formData = new FormData(); 
            //     formData.append('image', file)
            //     const response = await axios.post("http://localhost:8080/upload", formData, {
            //         headers: {
            //             "Content-Type": 'multipart/form-data'
            //         }
            //     }) 
            //     const storedImageUrl = response.data; 
            //     sessionStorage.setItem('image', storedImageUrl)
            // }
            // catch (err) {
            //     if(err.response) {
            //         console.log('Something is wrong with the server: ' + err.response.data)
            //     }
            //     else if(err.request) {
            //         console.log('Something is wrong with the client')
            //     }
            //     else {
            //         console.log(err)
            //     }
            // }
            // finally {
            //     const imageUrl = URL.createObjectURL(file)
            //     setBackgroundImage(imageUrl)
            // }
        }
    }
    return (
        <Box sx={{
            width: `${smallScreen ? "72%" : "28%"}`, 
            height: `${smallScreen ? "220px" : "265px"}`, 
        }}>
            <Box sx={{
                position: "relative", 
                width: "100%", 
                height: "100%", 
                borderRadius: "10px", 
                backgroundColor: "rgb(235, 235, 250)",
                backgroundImage: `url(${backgroundImage ? backgroundImage : ""})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "100% 100%", 
                outline: `${backgroundImage ? "none" : "dashed 4px rgb(120, 120, 120)"}`, 
                outlineOffset: "-4px", 
            }}>
                <Box sx={{
                    position: "relative",
                    left: "7%", 
                    top: "84%",  
                    float: "right"
                }}>
                    <Fab color="primary" size="small" onClick={handleClick}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <input 
                type="file"
                accept="image/*"
                onChange={handleChange} 
                ref={inputFileRef} 
                style={{display: "none"}} />
        </Box>
    )
}

export default CustomImageUploader


/*
    consider this code. This is how I upload the image: 

    const CustomImageUploader = () => {
        const storedImage = sessionStorage.getItem("image")
        const [backgroundImage, setBackgroundImage] = useState(storedImage ? storedImage : null); 
        const inputFileRef = useRef(null)
        const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm')); 

        function handleClick() {
            inputFileRef.current.click()
        }

        function handleChange(e) {
            const file = e.target.files[0]
            if(file) {
                const fileName = file.name; 
                const imageUrl = URL.createObjectURL(file)
                setBackgroundImage(imageUrl)
                sessionStorage.setItem('image', imageUrl)
                const reader = new FileReader(); 
                reader.onloadend = () => {
                    const arrayBuffer = reader.result
                    const base64 = arrayBufferToBase64(arrayBuffer)
                    const fileData = JSON.stringify({base64, fileName})
                    sessionStorage.setItem('fileData', fileData)
                }
                reader.readAsArrayBuffer(file)
            }
        }

        return (
            // some code here
        )
    }

    then, in the home page all images are displayed: 

    const Posts = () => {
        // some code here
        return (
            <Box>
                <ImageList cols={smallScreen ? 2 : 4} gap={8} sx={{ 
                    width: "100%",   
                    overflow: "hidden"
                }}>
                    {posts && posts.map((post) => {
                        return (
                            <ImageListItem key={post.id} id={post.id} onClick={() => handleOpen(post.id, post.username)>
                                <Box component="img" src={`${post.imageUrl}`} sx={{
                                    width: "100%", 
                                    height: `${smallScreen ? "220px" : "265px"}`, 
                                    borderRadius: "10px"
                                }} />
                            </ImageListItem>
                        )
                    })}
                </ImageList> 
            </Box>      
        )  
    }    

    Im using axios 'get' request method to fill 'posts' state variable with post data (including image url). Im fetching the data only once: 

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

    and this is my server:

    app.get('/posts', (req, res) => {
    const q = `
        SELECT posts.id, posts.publishDate, posts.content, posts.imageUrl, posts.likes, users.username FROM posts
        JOIN users ON users.id = posts.userId
    `
    db.query(q, (err, data) => {
        if(err) {
            res.status(500).send('There was an error when setting a query: ' + err)
        }
        else {
            res.json(data)
        }
    })

    the problem is: the images, when navigating to home page are rendering too slowly. To fully render it can take up to 2.5 seconds. incredibly slow. so, what is the exact issue here? (Please note, that urls are referring to the actual digital images which are stored in my google storage)
})
*/