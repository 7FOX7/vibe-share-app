import { useState, useMemo } from "react";
import Box from "@mui/material/Box"; 
import { AppBar, Toolbar } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRoute } from "../contexts/RouteContext";
import { useNavigate } from "react-router-dom";
import routes from "../data/routes";

const CustomAppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {route, setRoute, prevRoute} = useRoute(); 
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     const locationPath = location.pathname === "/" ? "home" : location.pathname.split("/")[1]
    //     setPrevLocation(locationPath)
    // }, [location])

    const open = Boolean(anchorEl)
    function handleClick(e) {
        setAnchorEl(e.currentTarget)
    }

    function goToPreviousRoute() {
        setRoute(prevRoute)
        navigate(-1)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const content = useMemo(() => {
        const matchingRoute = routes.find(_route => _route.routeName === route)
        const route_appBarContent = matchingRoute.routeName; 
        if(typeof(route_appBarContent) !== "undefined") {
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
        } 
        else {
            <p>no matching content for appbar is found</p>
        }

    }, [route])

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