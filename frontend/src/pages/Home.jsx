import { Suspense, lazy } from "react";

const Box = lazy(() => import("@mui/material/Box")); 
const Posts = lazy(() => import("../components/Home/Posts")); 

const Home = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Box sx={{
      display: "flex", 
      flexDirection: "column",
      backgroundColor: "secondary.main", 
      width: "100%", 
      height: "100%", 
      paddingInline: "10px", 
      paddingTop: "50px"}}>
        <Posts />
      </Box>
    </Suspense>
  )
}

export default Home