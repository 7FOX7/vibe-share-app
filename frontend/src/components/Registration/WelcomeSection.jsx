import { useState } from "react"
import { useMemo } from "react"
import { useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import greetings_source from "../../data/greetings_source"
import shiftValues from "../../functionalities/shiftValues"
import { greetingAnimation_in, greetingAnimation_out } from "../../animations/animations"

const WelcomeSection = () => {
  const [greetings, setGreetings] = useState(greetings_source); 
  const [showGreeting, setShowGreeting] = useState(true); 

  const animatedGreeting = useMemo(() => {
    return <Typography variant="h3" color="contrastColors.black.main" sx={{
      animation: `${showGreeting ? greetingAnimation_in : greetingAnimation_out} 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both`
    }}>
      {greetings[0].greeting}
    </Typography>
  }, [showGreeting]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGreeting(false); 
      setTimeout(() => {
        const shiftedGreetings = shiftValues(greetings); 
        setGreetings(shiftedGreetings); 
        setShowGreeting(true)
      }, 800)
    }, 2200)

    return () => clearInterval(interval); 
  }, [greetings])

  return (
    <Box component="article" sx={{
        flex: "1 1 auto", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        cursor: "default",
    }}>
        {animatedGreeting}
    </Box>
  )
}

export default WelcomeSection