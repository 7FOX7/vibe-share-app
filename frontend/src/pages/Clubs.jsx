import { Suspense, lazy } from "react";

const Box = lazy(() => import("@mui/material/Box")); 
const Container = lazy(() => import("../components/Clubs/Container")); 

const Clubs = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{
                width: "100%", 
                height: "100vh", 
                backgroundColor: "secondary.main", 
                paddingInline: "10px", 
                paddingTop: "50px", 
                overflow: "auto"
            }}>
                <Container />
            </Box>
        </Suspense>
    )
}

export default Clubs