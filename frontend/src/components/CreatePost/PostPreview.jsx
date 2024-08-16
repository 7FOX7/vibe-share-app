import { Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import theme from "../../theme/theme"

const PostPreview = () => {
    const storedImage = sessionStorage.getItem("image"); 
    const storedContent = sessionStorage.getItem("content"); 
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    return (
        <Box sx={{
            position: "relative", 
            width: `${smallScreen ? "60%" : "22%"}`, 
            height: `${smallScreen ? "200px" : "215px"}`,
            overflow: "hidden"
        }}>
            <Box sx={{
                width: "100%", 
                height: "100%", 
                borderRadius: "10px", 
                backgroundImage: `url(${storedImage ? storedImage : "/images/post_background_image__default.jpg"})`, 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "100% 100%", 
            }} />
            <Box sx={{
                position: "absolute", 
                left: 0, 
                top: 0, 
                width: "100%", 
                height: "100%", 
                padding: `${smallScreen ? "3px" : "8px"}`, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                textAlign: "center"
            }}>
                <Typography color="contrastColors.white.main">
                    {storedContent ? storedContent : ""}
                </Typography>
            </Box>
        </Box>
    )
}

export default PostPreview

/*
    the problem: 
    1. to be able to publish a post (basically so it was visible on the home page)

    procedure: 
    1. We need a database created which would contain a corresponding table (posts)
    
    2. For handling http requests (like clicking on 'publish' button) I will use axios
    assuming we have got a function which runs specifically when the 'publish' button is clicked: 

    async function handlePublishing() {
        const postData = {
            title: "title", 
            image: "image", 
            ...
        }
        try {
            const response = await axios.post("localhost:8080/posts", postData)
            console.log(response)
        }
        catch(err) {
            if(err.request) {
                console.log(there is a problem with a request)
            }
            else(err.response) {
                console.log(there is a problem with a server)
            }
            else {
                console.log(err)
            }
        }
    }

    3. what is going to be in our server.js: 

    app.post('/posts', (req, res) => {
        const {title, image, ...} = req.body();
        const q = "INSERT INTO posts ? ? ?" 
        db.query(q, [title, image, ... ], (err) {
            if(err) {
                return res.status(500).send(err)
            }
            return res.status(200).send()
        })  
    })

    
*/