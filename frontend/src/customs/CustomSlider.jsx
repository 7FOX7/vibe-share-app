import Box from "@mui/material/Box"; 
import Slider from "@mui/material/Slider"; 
import { useScreenSize } from "../contexts/ScreenSizeContext";
import globalFunctions from "../data/globalFunctions";
import { usePosts } from "../contexts/PostsContext";
import { useGeolocation } from "../contexts/GeolocationContext";

const handleSliderChange = globalFunctions[0].handleSliderChange; 

const CustomSlider = ({marks}) => {
    const {posts, setGeolocationFilteredPosts} = usePosts(); 
    const {geolocation} = useGeolocation(); 
    const {isSmallScreen} = useScreenSize(); 
    return (
        <Box sx={{
            width: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginTop: "8px", 
            color: "red"
        }}>
            <Box sx={{
                width: `${isSmallScreen ? "220px" : "300px"}`
            }}>
                <Slider 
                    defaultValue={250}
                    min={15}
                    max={250}
                    step={80}
                    marks={marks}
                    color="primary"
                    onChange={(e) => handleSliderChange(e, posts, setGeolocationFilteredPosts, geolocation)}
                />

            </Box>
        </Box>
    )
}

export default CustomSlider