import Box from "@mui/material/Box";

const Layer = ({children}) => {
    return (
        <Box sx={{
            backgroundColor: "secondary.main", 
            width: "100vw", 
            height: "100vh", 
            paddingInline: "50px", 
            paddingTop: "50px"
        }}>
            <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-around", 
                width: "100%", 
                height: "100%"
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default Layer; 