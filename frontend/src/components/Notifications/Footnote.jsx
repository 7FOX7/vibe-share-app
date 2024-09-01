import { memo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footnote = memo(function Footnote() {
    console.log('foot note rerun')
    return (
        <Box sx={{
            marginTop: "10px", 
            marginBottom: "50px", 
        }}>
            <Typography>🎉 That's all folks!</Typography>
        </Box>
    )
})

export default Footnote