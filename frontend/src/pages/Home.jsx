import { Suspense, lazy } from "react";

const Box = lazy(() => import("@mui/material/Box")); 
const Posts = lazy(() => import("../components/Home/Posts")); 

const Home = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Box sx={{
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        backgroundColor: "secondary.main", 
        paddingInline: "10px", 
        paddingTop: "50px", 
        overflow: "auto"
      }}>
        <Posts />
      </Box>
    </Suspense>
  )
}

export default Home