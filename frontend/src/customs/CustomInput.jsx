import { useScreenSize } from "../contexts/ScreenSizeContext"
import { forwardRef } from "react"
import { Input as BaseInput } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"

const CustomInput = forwardRef(function CustomInput(props, ref) {
    const {isSmallScreen} = useScreenSize();  
    const rootStyle = {
        marginBottom: "22px", 
        width: `${isSmallScreen ? props.width : "25%"}`, 
        border: props.border, 
        borderRadius: props.borderRadius, 
        fontSize: props.fontSize, 
        padding: props.padding, 
    }
    const inputStyle = {
        padding: props.padding, 
        color: props.color, 
    }

    return <BaseInput 
        required 
        slotProps={{
            root: {style: rootStyle}, 
            input: {style: inputStyle} 
        }} 
        endAdornment={
            <InputAdornment position='end'>
                {props.icon}
            </InputAdornment>
        }
        placeholder={props.placeholder} 
        inputRef={ref} 
        value={props.value}
        onChange={props.onChange} 
        disableUnderline={true} 
        onSubmitCapture={() => console.log('wanna submit capture?')}
        onSubmit={() => console.log('wanna just submit?')}
    />
})

export default CustomInput