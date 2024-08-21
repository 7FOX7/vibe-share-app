import { useEffect } from "react"
import Box from "@mui/material/Box"
import PostTemplate from "../components/CreatePost/PostTemplate"

const CreatePost = () => {
    useEffect(() => {
        return () => {
            sessionStorage.clear()
        }
    }, [])
    return (
        <Box sx={{
            backgroundColor: "secondary.main", 
            width: "100%", 
            height: "100vh", 
            paddingInline: "10px", 
            paddingTop: "50px"}}>
                <PostTemplate />
        </Box>
    )
}

export default CreatePost


/*
    <Route path="/create-post" element={<CreatePost />} >
        <Route path="/text" element={<WriteText /> />
        <Route path="/image" element={<SelectImage /> }
    </Route>


    const activeStep = useMemo(() => {
        'createText' ? <WriteText /> : <SelectImage />     
    })
*/