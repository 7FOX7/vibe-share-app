import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostAuthor } from "../contexts/PostAuthorContext";
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
import authorAppBar from "../data/authorAppBar";

const CustomAppBar = () => { 
    const [anchorEl, setAnchorEl] = useState(null);
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
        navigate('/', {relative: "route"})
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const content = useMemo(() => {
        if(pathName === "/") {
            return (
                <>
                    {filterButtons.map((filterButton) => {
                        async function handleClick() {
                            switch(filterButton.title) {
                                case "Popular": 
                                    pathName !== "/" && navigate("/", {relative: "route"})
                                    console.log('you clicked POPULAR button')
                                    break; 
                                case "Watch": 
                                    if(pathName !== "/post-view") {
                                        navigate("/video-view", {relative: "route"})
                                    }
                                    break; 
                                case "Recent": 
                                    pathName !== "/" && navigate("/", {relative: "route"})
                                    console.log('you clicked RECENT button')
                                    break;
                                case "Local": 
                                    pathName !== "/" && navigate("/", {relative: "route"})
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
        else {
            return (
                <>
                    <Box onClick={goToPreviousRoute} sx={{
                        display: "flex", 
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
                <Toolbar sx={{justifyContent: "space-between", paddingInline: "3%", width: "100%"}}>
                    {content}
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default CustomAppBar