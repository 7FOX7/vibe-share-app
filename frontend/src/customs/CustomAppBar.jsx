import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useRoute } from "../contexts/RouteContext";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import routes from "../data/routes";
import urlRegex from "../data/urlRegex";

const CustomAppBar = () => { 
    const [anchorEl, setAnchorEl] = useState(null);
    const {route, setRoute} = useRoute(); 
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const pathName = location.pathname;

    const open = Boolean(anchorEl)

    const handleClick = useCallback((e) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const goToPreviousRoute = useCallback(() => {
        setRoute('home')
        navigate('/', {relative: "route"})
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const username = useMemo(() => {
        if(pathName.match(urlRegex)) {
            const usernamePart = pathName.split('/post-view/')[1]
            const username = usernamePart.split('/')[1]
            return username
        }
        return 'User'
    }, [route, pathName])

    const content = useMemo(() => {
        const matchingRoute = routes.find(_route => _route.routeName === route)
        if(typeof(matchingRoute) !== "undefined") {
            const route_appBarContent = matchingRoute.routeName; 
            if(route_appBarContent === "home") {
                return (
                    <>
                        {filterButtons.map((filterButton) => {
                            function handleClick() {
                                switch(filterButton.title) {
                                    case "Popular": 
                                        console.log('you clicked POPULAR button')
                                        break; 
                                    case "Watch": 
                                        console.log('you clicked WATCH button')
                                        break; 
                                    case "Recent": 
                                        console.log('you clicked RECENT button')
                                        break;
                                    case "Local": 
                                        console.log('you clicked LOCAL button')
                                        break;
                                }
                            }
                            return (
                                <CustomButton 
                                    key={filterButton.id} 
                                    id={filterButton.id} 
                                    title={filterButton.title} 
                                    icon={filterButton.icon}
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
                    </>
                )
            }
            else if(route_appBarContent === "create-post") {
                return (
                    <>
                        <Box onClick={goToPreviousRoute} sx={{
                            cursor: "pointer"
                        }}>
                            <ArrowBackIosIcon />
                        </Box>
                    </>
                )
            }
            else if(route_appBarContent === "create-video") {
                return (
                    <>
                        <Box onClick={goToPreviousRoute} sx={{
                            cursor: "pointer"
                        }}>
                            <ArrowBackIosIcon />
                        </Box>
                    </>
                )
            }
            else if(route_appBarContent === "post-view") {
                return (
                    <>
                        <Box onClick={goToPreviousRoute} sx={{
                            display: "flex", 
                            alignItems: "center", 
                            cursor: "pointer" 
                        }}>
                            <ArrowBackIosIcon />
                            <Typography typography="usernameAppBar">
                                {username}
                            </Typography>
                        </Box>
                    </>
                )
            }
        } 
        else {
            <p>no matching content for appbar is found</p>
        }

    }, [route, anchorEl, location])

    return (
        <AppBar position="fixed" color="secondary" elevation={0}>
            <Box>
                <Toolbar sx={{justifyContent: "space-between", paddingInline: "3%", width: "100%"}}>
                    {content}
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default CustomAppBar