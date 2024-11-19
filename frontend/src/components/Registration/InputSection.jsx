import { useState } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Box from "@mui/material/Box"
import BottomSection from "./BottomSection"
import CustomInput from "../../customs/CustomInput"
import { strongRegex, mediumRegex } from "../../utils/regex/passwordRegex"

const InputSection = () => { 
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const [displayerColor, setDisplayerColor] = useState(null); 
  const [displayerVisibility, setDisplayerVisibility] = useState("hidden"); 
  const [fillness, setFillness] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);  
  const [formComplete, setFormComplete] = useState(false); 
  const {setUser, isLoginMode} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      "username": usernameRef.current.value.trim(), 
      "password": passwordRef.current.value.trim()
    }); 
  }

  const clearForm = useCallback(() => {
    usernameRef.current.value = ""
    passwordRef.current.value = ""

    setPasswordMessage(null)
    setFillness(null)
    setDisplayerColor(null) 
    setDisplayerVisibility("hidden") 
    setFormComplete(false)
  }, [])

  const handleLogin = useCallback(() => {
    usernameRef.current.value !== "" && passwordRef.current.value !== "" ? setFormComplete(true) : setFormComplete(false)
  }, [])

  const handleRegistration = useCallback(() => {
    usernameRef.current.value !== "" && strongRegex.test(passwordRef.current.value) ? setFormComplete(true) : setFormComplete(false);
  }, [])

  function handleUsernameInput() {
    isLoginMode ? handleLogin() : handleRegistration() 
  }

  function handlePasswordInput() {
    !isLoginMode ? (handleRegistration(), checkForPasswordStrength()) : handleLogin()
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
  }

  return (
    <Box 
      component="form" 
      sx={{
      flex: "1 1 auto", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
           
    }}>
        <CustomInput 
          placeholder="Enter username" 
          width="75%" 
          borderRadius="15px" 
          border="1px solid" 
          fontSize="1.3rem" 
          padding="4px 8px" 
          onChange={handleUsernameInput}
          ref={usernameRef} 
        />
        <CustomInput 
          placeholder="Enter password" 
          width="75%" 
          borderRadius="15px" 
          border="1px solid" 
          fontSize="1.3rem" 
          padding="4px 8px" 
          onChange={handlePasswordInput} 
          ref={passwordRef} 
        />
        <BottomSection 
          displayerColor={displayerColor} 
          fillness={fillness} 
          passwordMessage={passwordMessage} 
          displayerVisibility={displayerVisibility} 
          onClick={handleSubmit} 
          clearForm={clearForm}
          formComplete={formComplete} 
        />
    </Box>
  )
}

export default InputSection