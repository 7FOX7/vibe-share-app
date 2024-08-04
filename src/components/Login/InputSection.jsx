import { useState, useRef } from "react"
import { Box, Typography } from "@mui/material"
import CustomInput from "../../customs/CustomInput"
import BottomSection from "./BottomSection"
import { strongRegex, mediumRegex } from "../../data/passwordRejex"
import { Navigate } from "react-router-dom"

function InputSection() {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const errorMessageRef = useRef(null); 
  const [displayerColor, setDisplayerColor] = useState(null); 
  const [fillness, setFillness] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);  

  function handleSubmit(e) {
    e.preventDefault(); 
    
  }

  function checkForUsername() {
    usernameRef.current.value === "" ? errorMessageRef.current.style.visibility = "visible" : errorMessageRef.current.style.visibility = "hidden"
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
        <BottomSection displayerColor={displayerColor} fillness={fillness} passwordMessage={passwordMessage} onClick={handleSubmit}/>
    </Box>
  )
}

export default InputSection