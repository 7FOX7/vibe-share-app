import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useGeolocation } from "../../contexts/GeolocationContext";
import { useSelectedButton } from "../../contexts/SelectedButtonContext";
import askLocationButtons from "../../data/askLocationButtons"
import Box from "@mui/material/Box"
import CustomButton from "../../customs/CustomButton"
import filterButtons from "../../data/filterButtons";

const Buttons = () => {
    const {isSmallScreen} = useScreenSize();
    const {setIsTrackingLocationAllowed} = useGeolocation(); 
    const {setSelectedButton} = useSelectedButton(); 
    return (
        <>
            <Box sx={{
                width: `${isSmallScreen ? "80%" : "460px"}`, 
                height: "8%",
                display: "flex", 
                justifyContent: "space-between"
            }}>
                {askLocationButtons.map((askLocationButton) => {
                    function handleClick() {
                        switch(askLocationButton.title) {
                            case "No, Thanks!": 
                                setSelectedButton(filterButtons[0].title); 
                                break;
                            case "Yes, Turn On!": 
                                localStorage.clear(); 
                                localStorage.setItem('isTrackingLocationAllowed', true); 
                                setIsTrackingLocationAllowed(true); 
                                setSelectedButton(filterButtons[0].title); 
                                break;  
                        }
                    }
                    return (
                        <CustomButton 
                            key={askLocationButton.id}
                            title={askLocationButton.title}
                            width={`${isSmallScreen ? "120px" : "200px"}`}
                            border={askLocationButton.title === "No, Thanks!" ? "2px solid" : "none"}
                            backgroundColor={askLocationButton.title === "No, Thanks!" ? "contrastColors.white.main" : "primary.main"}
                            fontSize="1rem"
                            onClick={handleClick}
                        />
                    ) 
                })}
            </Box>
        </>
    )
}

export default Buttons