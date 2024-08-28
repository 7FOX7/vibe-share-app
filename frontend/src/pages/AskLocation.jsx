import { Suspense, lazy } from "react"

const Box = lazy(() => import("@mui/material/Box")); 
const Main = lazy(() => import("../components/AskLocation/Main"))

const AskLocation = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Box sx={{
                display: "flex", 
                flexDirection: "column",
                backgroundColor: "secondary.main", 
                width: "100%", 
                height: "100vh", 
                paddingInline: "10px", 
                paddingTop: "50px"
            }}>
                <Main />
            </Box>
        </Suspense>
    )
}

export default AskLocation