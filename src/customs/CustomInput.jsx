import { Input as BaseInput, useMediaQuery } from "@mui/material"
import theme from "../theme/theme"

const CustomInput = (props) => {
    const smallScreen = useMediaQuery(theme.breakpoints.down('md')); 
    const rootStyle = {
        marginBottom: "22px", 
        width: `${smallScreen ? "75%" : "25%"}`, 
        border: "1px solid", 
        borderRadius: "15px", 
        fontSize: "1.3rem", 
        padding: "4px 8px"
    }
    const inputStyle = {
        padding: "4px 8px"
    }

    return <BaseInput slotProps={{
        root: {style: rootStyle}, 
        input: {style: inputStyle} 
    }} {...props} />
}

export default CustomInput