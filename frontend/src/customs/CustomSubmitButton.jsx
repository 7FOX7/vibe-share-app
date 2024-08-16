import Button from "@mui/material/Button"
import { useAuth } from "../contexts/AuthContext"

const CustomSubmitButton = ({onClick, formComplete}) => {
    const { isLoginMode } = useAuth(); 
    return (
        <>
          <Button onClick={onClick} type="submit" disabled={!formComplete} sx={{ 
            marginTop: "25px", 
            background: "#000", 
            color: "contrastColors.white.main", 
            borderRadius: "50px",
            transition: "0.5s", 
            ":hover": {
              background: "rgb(80, 80, 80)",
            }, 
            "&:after": {
              content: `${!formComplete ? "none" : "''"}`, 
              borderRadius: "50px",
              width: "105%", 
              height: "130%", 
              position: "absolute", 
              left: "5",  
              top: "5", 
              background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)", 
              zIndex: "-1"
            }, 
            ":disabled": {
              background: "rgba(0, 0, 0, 0.15)",
              cursor: "not-allowed", 
              border: "none", 
            }
          }}>
            {isLoginMode ? "Login" : "Register"}
          </Button>
        </>
    )
}

export default CustomSubmitButton