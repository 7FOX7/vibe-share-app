import { Box, Link, useMediaQuery } from "@mui/material"
import PasswordStrengthBar from "./PasswordStrengthBar"
import CustomSubmitButton from "../../customs/CustomSubmitButton"
import theme from "../../theme/theme"
import { useAuth } from "../../contexts/AuthContext"

const BottomSection = ({displayerColor, fillness, passwordMessage, displayerVisibility, onClick, formComplete}) => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const {isLoginMode, setIsLoginMode} = useAuth(); 

    function handleClick() {
        setIsLoginMode((prevMode) => !prevMode)
    }

    return (
        <Box sx={{
            width: `${smallScreen ? "75%" : "25%"}`,
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
                <Link component="button" color="linkColor.main" onClick={handleClick}>
                    {isLoginMode ? "Not Registered? Sign up Instead." : "Already Registered? Sign in Instead."}
                </Link>
            </Box>
        </Box>
    )
}

export default BottomSection