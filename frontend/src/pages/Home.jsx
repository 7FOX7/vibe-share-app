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
      height: "100vh", 
      paddingInline: "10px", 
      paddingTop: "50px"}}>
        <Posts />
      </Box>
    </Suspense>
  )
}

export default Home

/*
    assuming we are using 'create-post' route: 

    inside App.jsx: 
    <Route path="/create-post" element={<CreatePost />} />

    inside CreatePost.jsx: 
    const [activeStep, setActiveStep] = useState('text-input')
    
    const content = useMemo(() => {
      activeStep === "text-input" ? <Box>text input</Box> : <Box>image input</Box>  
    })
    
    <Box>
      content
    </Box>


*/