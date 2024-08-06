import { useAuth } from "../contexts/AuthContext";

function Home() {
  // function capitalizeFirstLetter(value) {
  //   if(value.charAt(0) !== "/") return; 
  //   return value.charAt(1).toUpperCase(); 
  // }
  // const title = location.pathname === "/" ? "Welcome" : capitalizeFirstLetter(location.pathname); 
  const {user} = useAuth(); 
  return (
    <>
      <p>welcome home. hello, {user}</p>
    </>
  )
}

export default Home