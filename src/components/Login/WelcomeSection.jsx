import { useState, useMemo, useEffect } from "react"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import greetings_source from "../../data/greetings_source"
import shiftValues from "../../functionalities/shiftValues"
import { greetingAnimation_in, greetingAnimation_out } from "../../animations/animations"


function WelcomeSection() {
  const [greetings, setGreetings] = useState(greetings_source); 
  const greeting = greetings[0].greeting; 
  const greetingAnimated = useMemo(() => {
    <Typography variant="h3" color="primary.main" sx={{animation: greetings}}>
        {greeting}
    </Typography>
  }, [])
  return (
    <Box component="article" sx={{
        flex: "1.1 1 auto"
    }}>
        {greetingAnimated}
    </Box>
  )
}

export default WelcomeSection