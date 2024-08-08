import Box from "@mui/material/Box";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main";
import Footer from "../components/Home/Footer";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const {user} = useAuth(); 
  return (
    <Box sx={{
      display: "flex", 
      flexDirection: "column",
      width: "100vw", 
      height: "100vh", 
      paddingTop: "50px", 
      paddingBottom: "10px", 
      paddingInline: "10px"}}>
        <p>hello {user.username}</p>
        <Header />
        <Main />
        <Footer />
    </Box>
  )
}

export default Home