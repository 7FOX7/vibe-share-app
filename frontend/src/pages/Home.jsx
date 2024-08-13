import Box from "@mui/material/Box";
import Posts from "../components/Home/Posts";

const Home = () => {
  return (
    <Box sx={{
      display: "flex", 
      flexDirection: "column",
      backgroundColor: "secondary.main", 
      width: "100vw", 
      height: "100vh", 
      paddingInline: "10px", 
      paddingTop: "50px"}}>
        <Posts />
    </Box>
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