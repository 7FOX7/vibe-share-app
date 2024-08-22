import { useEffect } from "react"
import Box from "@mui/material/Box"
import Main from "../components/CreateVideo/Main"

const CreateVideo = () => {
    useEffect(() => {
        return () => {
            sessionStorage.clear()
        }
    }, [])

    return (
        <Box sx={{
            width: "100%", 
            height: "100vh", 
            backgroundColor: "primary.main", 
            paddingInline: "10px", 
            paddingTop: "50px"
        }}>
            <Main />
        </Box>
    )
}

export default CreateVideo