import { useState, useMemo } from "react";
import Box from "@mui/material/Box"; 
import { AppBar, Toolbar } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import filterButtons from "../data/filterButtons";
import CustomButton from "./CustomButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { usePostMode } from "../contexts/PostModeContext";
import { useNavigate } from "react-router-dom";

const CustomAppBar = () => {
    const {postMode, setPostMode} = usePostMode(); 
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl)
    function handleClick(e) {
        setAnchorEl(e.currentTarget)
    }

    function changePostMode() {
        setPostMode(false)
        navigate("/", {relative: "route"})
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const content = useMemo(() => {
        return postMode ? 
        <>
            <Box onClick={changePostMode}>
                <ArrowBackIosIcon />
            </Box>
        </>
        : 
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
    })

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