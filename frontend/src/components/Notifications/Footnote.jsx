import { useTheme } from "@emotion/react"
import { memo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footnote = memo(function Footnote() {
    const theme = useTheme(); 
    return (
        <Box sx={{
            marginTop: "10px", 
        }}>
            <Typography sx={{color: theme.palette.notifications.localPostsText.main}}>🎉 That's all folks!</Typography>
        </Box>
    )
})

export default Footnote