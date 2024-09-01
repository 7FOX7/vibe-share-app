import { Suspense, lazy } from "react";

const Container = lazy(() => import("../components/Notifications/Container"));
const Box = lazy(() => import("@mui/material/Box")); 

const Notifications = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{
                width: "100%", 
                height: "100%",
                backgroundColor: "secondary.main", 
                paddingInline: "10px", 
                paddingTop: "50px", 
            }}>
                <Container />
            </Box>
        </Suspense>
    )
}

export default Notifications