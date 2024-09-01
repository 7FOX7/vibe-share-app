import { Suspense, lazy } from "react"

const Box = lazy(() => import("@mui/material/Box")); 
const Main = lazy(() => import("../components/Settings/Main"))

const Settings = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{
                width: "100%", 
                height: "100vh", 
                backgroundColor: "secondary.main", 
                paddingInline: "10px", 
                paddingTop: "50px", 
                overflow: "hidden"
            }}>
                <Main />
            </Box>
        </Suspense>
    )
}

export default Settings