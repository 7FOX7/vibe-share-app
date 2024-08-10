import Box from "@mui/material/Box";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main";

const Home = () => {
  return (
    <Box sx={{
      display: "flex", 
      flexDirection: "column",
      backgroundColor: "secondary.main", 
      width: "100vw", 
      height: "100vh", 
      paddingInline: "10px"}}>
        <Header />
        <Main />
    </Box>
  )
}

export default Home