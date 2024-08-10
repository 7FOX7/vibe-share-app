import { useState, useRef } from "react"
import { Box, Typography } from "@mui/material"
import CustomInput from "../../customs/CustomInput"
import BottomSection from "./BottomSection"
import { useAuth } from "../../contexts/AuthContext"
import { strongRegex, mediumRegex } from "../../data/passwordRejex"

const InputSection = () => { 
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const errorMessageRef = useRef(null); 
  const [displayerColor, setDisplayerColor] = useState(null); 
  const [displayerVisibility, setDisplayerVisibility] = useState("hidden"); 
  const [fillness, setFillness] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);  
  const [formComplete, setFormComplete] = useState(false); 
  const {setUser} = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setUser({
      "username": usernameRef.current.value, 
      "password": passwordRef.current.value
    }); 
  }

  function checkForUsername() {
    usernameRef.current.value === "" ? errorMessageRef.current.style.visibility = "visible" : errorMessageRef.current.style.visibility = "hidden"

    strongRegex.test(passwordRef.current.value) && usernameRef.current.value !== "" ? setFormComplete(true) : setFormComplete(false);
  }

  function checkForPasswordStrength() {
    if(strongRegex.test(passwordRef.current.value)) {
      setDisplayerColor("#2e7d32")
      setFillness("100%")
      setPasswordMessage("The password is strong.")
    }
    else if(mediumRegex.test(passwordRef.current.value)) {
      setDisplayerColor("#ff9800")
      setFillness("60%")
      setPasswordMessage("The password is easy to guess. Please, include at least 1 uppercase letter, 1 number, and 1 special character.")
    }
    else {
      setDisplayerColor("#c62828")
      setFillness("20%")
      setPasswordMessage("The password is easy to guess. Please, include at least 1 uppercase letter, 1 number, and 1 special character.")
    }

    setDisplayerVisibility("visible"); 
    strongRegex.test(passwordRef.current.value) && usernameRef.current.value !== "" ? setFormComplete(true) : setFormComplete(false);
  }

  return (
    <Box component="form" sx={{
        flex: "1 1 auto", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
    }}>
        <Box ref={errorMessageRef} sx={{
          visibility: "hidden"
        }}>
          <Typography color="#c62828" typography="errorMessage">This field cannot be empty</Typography>
        </Box>
        <CustomInput placeholder="Enter username" onChange={checkForUsername} ref={usernameRef} />
        <CustomInput placeholder="Enter password" onChange={checkForPasswordStrength} ref={passwordRef} />
        <BottomSection displayerColor={displayerColor} fillness={fillness} passwordMessage={passwordMessage} onClick={handleSubmit} formComplete={formComplete} displayerVisibility={displayerVisibility} />
    </Box>
  )
}

export default InputSection