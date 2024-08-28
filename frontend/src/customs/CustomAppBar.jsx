import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostAuthor } from "../contexts/PostAuthorContext";
import { useSelectedButton } from "../contexts/SelectedButtonContext";
import Box from "@mui/material/Box"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import CustomSlider from "./CustomSlider";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import authorAppBar from "../data/authorAppBar";
import appBarRoutes from "../data/appBarRoutes";
import { locationMarks } from "../data/sliderMarks";

const CustomAppBar = () => { 
    const [anchorEl, setAnchorEl] = useState(null);
    const {selectedButton, setSelectedButton, sliderIsVisible} = useSelectedButton();
    const {author} = usePostAuthor(); 
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const pathName = location.pathname;
    const formattedRoute = pathName.substring(1, pathName.length).split('/')[0] 

    const open = Boolean(anchorEl)

    const handleClick = useCallback((e) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const goToPreviousRoute = useCallback(() => {
        navigate(-1)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const content = useMemo(() => {
        if(appBarRoutes.includes(pathName)) {
            return (
                <>
                    <Box sx={{
                        width: "100%", 
                        display: "flex", 
                        justifyContent: "space-between"
                    }}>
                        {filterButtons.map((filterButton) => {
                            async function handleClick() {
                                switch(filterButton.title) {
                                    case "Popular": 
                                        setSelectedButton("Popular")
                                    break; 
                                    case "Watch": 
                                        setSelectedButton("Watch")
                                    break; 
                                    case "Recent": 
                                        setSelectedButton("Recent")
                                    break; 
                                    case "Local": 
                                        setSelectedButton("Local")
                                    break;
                                }
                            }
                            return (
                                <CustomButton 
                                    key={filterButton.id} 
                                    id={filterButton.id} 
                                    title={filterButton.title} 
                                    icon={filterButton.icon}
                                    backgroundColor={selectedButton === filterButton.title ? "primary.main" : "contrastColors.white.main"}
                                    onClick={handleClick}
                                >
                                    {filterButton.title}
                                </CustomButton>
                            )
                        })}
                        <Box onClick={handleClick} sx={{
                            display: "flex", 
                            alignItems: "center", 
                            padding: "6px", 
                            backgroundColor: "tertiary.light",
                            borderRadius: "50px",
                            cursor: "pointer" 
                        }}>
                            <AccountCircleOutlinedIcon color="primary" />
                        </Box>
                    </Box>
                    <Menu
                        id="headerMenu"
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        open={open}
                    >
                        <MenuItem>
                            settings
                        </MenuItem>
                        <MenuItem>
                            dark mode
                        </MenuItem>
                    </Menu>
                    {sliderIsVisible && <CustomSlider marks={locationMarks} />}
                </>
            )
        }
        else {
            return (
                <>
                    <Box onClick={goToPreviousRoute} sx={{
                        display: "flex", 
                        alignSelf: "start", 
                        alignItems: "center", 
                        cursor: "pointer"
                    }}>
                        <ArrowBackIosIcon />
                        {authorAppBar.includes(formattedRoute) && 
                            <Typography typography="usernameAppBar">
                                {author}
                            </Typography>
                        }
                    </Box>
                </>
            )
        }
    }, [anchorEl, location])
    
    return (
        <AppBar position="fixed" color="secondary" elevation={0}>
            <Box>
                <Toolbar sx={{
                    width: "100%", 
                    paddingTop: "12px",  
                    flexDirection: "column", 
                    paddingInline: "3%", 
                }}>
                    {content}
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default CustomAppBar

/*
    assuming we will have some kind of global array which will contain the key functions as objects, like: 

    const global = [
        {
            function handleSliderChange() {
                const currentValue = e.target.value (this will give us, for example, 25 kilometers); 
                const maxValue = maxSliderValues[currentValue]; 


                const filteredPosts = posts.filter((post) => {
                    const distanceInKilometers = getDistance(currentUserLocation, {post.latitude, post.longitude})
                    return distanceInKilometers <= maxValue    
                })

                setPosts(filteredPosts)
            }
        }
    ]

    // with this approach we have a problem: 

*/