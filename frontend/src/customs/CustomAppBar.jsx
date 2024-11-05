import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostAuthor } from "../contexts/PostAuthorContext";
import { useSelectedButton } from "../contexts/SelectedButtonContext";
import Box from "@mui/material/Box"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import CustomSlider from "./CustomSlider";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import appBarRoutes from "../data/appBarRoutes";
import { locationMarks } from "../data/sliderMarks";
import AppBarContent from "../components/Shared/AppBarContent";

const CustomAppBar = ({setIsDarkTheme}) => { 
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

    const goToSettings = useCallback(() => {
        setAnchorEl(null)
        navigate('/settings', {relative: "route"})
    }, [])

    const handleThemeSetting = useCallback(() => {
        const isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'))     // true/false
        localStorage.setItem('isDarkTheme', !isDarkTheme)
        setIsDarkTheme((prevTheme) => !prevTheme)
        setAnchorEl(null)
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
                        <MenuItem onClick={goToSettings}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleThemeSetting}>
                            Switch Theme
                        </MenuItem>
                    </Menu>
                    {sliderIsVisible && <CustomSlider marks={locationMarks} />}
                </>
            )
        }
        else {
            const ContentComponent = AppBarContent[formattedRoute] || AppBarContent.default
            return <ContentComponent goToPreviousRoute={goToPreviousRoute} formattedRoute={formattedRoute} author={author} /> 
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