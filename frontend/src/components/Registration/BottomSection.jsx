import { useScreenSize } from "../../contexts/ScreenSizeContext"
import { useAuth } from "../../contexts/AuthContext"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import PasswordStrengthBar from "./PasswordStrengthBar"
import CustomSubmitButton from "../../customs/CustomSubmitButton"

const BottomSection = ({displayerColor, fillness, passwordMessage, displayerVisibility, onClick, clearForm, formComplete}) => {
    const {isSmallScreen} = useScreenSize(); 
    const {isLoginMode, setIsLoginMode} = useAuth(); 

    function handleClick(e) {
        e.preventDefault()
        clearForm()
        setIsLoginMode((prevMode) => !prevMode)
    }

    return (
        <Box sx={{
            width: `${isSmallScreen ? "75%" : "25%"}`,
            display: "flex", 
            flexDirection: "column"
        }}>
            {!isLoginMode ? <PasswordStrengthBar displayerColor={displayerColor} fillness={fillness} passwordMessage={passwordMessage} displayerVisibility={displayerVisibility} /> : ''}
            <CustomSubmitButton onClick={onClick} formComplete={formComplete} />
            <Box sx={{
                marginTop: "15px", 
                display: "flex", 
                justifyContent: "center"
            }}>
                <Link component="button" color="registration.linkColor.main" onClick={handleClick}>
                    {isLoginMode ? "Not Registered? Sign up Instead." : "Already Registered? Sign in Instead."}
                </Link>
            </Box>
        </Box>
    )
}

export default BottomSection