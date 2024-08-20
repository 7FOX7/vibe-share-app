import { useState, useMemo, useCallback } from "react";
import Box from "@mui/material/Box"; 
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRoute } from "../contexts/RouteContext";
import { useLocation, useNavigate } from "react-router-dom";
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
                            return (
                                <CustomButton key={filterButton.id} id={filterButton.id} title={filterButton.title} icon={filterButton.icon}>
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
                            <AccountCircleOutlinedIcon sx={{color: "primary.dark"}}/>
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
                        <Box onClick={goToPreviousRoute}>
                            <ArrowBackIosIcon />
                        </Box>
                    </>
                )
            }
            else if(route_appBarContent === "post-view") {
                return (
                    <>
                        <Box onClick={goToPreviousRoute}>
                            <ArrowBackIosIcon />
                            <Typography>
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
            <Container fixed>
                <Toolbar sx={{justifyContent: "space-between", padding: "0", width: "100%"}}>
                    {content}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default CustomAppBar