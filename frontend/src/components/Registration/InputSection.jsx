import { useState, useRef, useEffect, useCallback } from "react"
import Box from "@mui/material/Box"
import BottomSection from "./BottomSection"
import CustomInput from "../../customs/CustomInput"
import { useAuth } from "../../contexts/AuthContext"
import { strongRegex, mediumRegex } from "../../data/passwordRegex"

const InputSection = () => { 
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const [displayerColor, setDisplayerColor] = useState(null); 
  const [displayerVisibility, setDisplayerVisibility] = useState("hidden"); 
  const [fillness, setFillness] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);  
  const [formComplete, setFormComplete] = useState(false); 
  const {setUser, isLoginMode} = useAuth();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setUser({
      "username": usernameRef.current.value, 
      "password": passwordRef.current.value
    }); 
  }, [isLoginMode])

  function checkForFormComplete() {
    if(!isLoginMode) {
      usernameRef.current.value !== "" && strongRegex.test(passwordRef.current.value) ? setFormComplete(true) : setFormComplete(false);
    }
    else {
      usernameRef.current.value !== "" && passwordRef.current.value !== "" ? setFormComplete(true) : setFormComplete(false)
    }    
  }

  function checkForPasswordStrength() {
    if(!isLoginMode) {
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
    return
  }

  useEffect(() => {
    const username = usernameRef.current
    const password = passwordRef.current
    const userData = [username, password]

    userData.forEach((_userData) => {
      _userData.addEventListener("input", checkForFormComplete)
      console.log('useEffect executed!')
    })

    return () => {
      userData.forEach((_userData) => {
        _userData.removeEventListener("input", checkForFormComplete)
        console.log('useEffect cleared')
      })
    }
  }, [isLoginMode])

  return (
    <Box component="form" sx={{
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
          ref={usernameRef} 
        />
        <CustomInput 
          placeholder="Enter password" 
          width="75%" 
          borderRadius="15px" 
          border="1px solid" 
          fontSize="1.3rem" 
          padding="4px 8px" 
          onChange={checkForPasswordStrength} 
          ref={passwordRef} 
        />
        <BottomSection 
          displayerColor={displayerColor} 
          fillness={fillness} 
          passwordMessage={passwordMessage} 
          displayerVisibility={displayerVisibility} 
          onClick={handleSubmit} 
          formComplete={formComplete} 
        />
    </Box>
  )
}

export default InputSection