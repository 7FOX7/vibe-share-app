import { useState } from "react";
import { useMemo } from "react";
import { useClubs } from "../../contexts/ClubsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import Box from "@mui/material/Box"; 
import ClubsSection from "./ClubsSection";
import CustomModal from "../../customs/CustomModal"; 
import axios from "axios";

const showTwoButtons = true; 
const message = "Are you sure you want to leave the club?"; 

const Container = () => {
    const [clubId, setClubId] = useState(null); 
    const [open, setOpen] = useState(false); 
    const {user} = useAuth(); 
    const {isSmallScreen} = useScreenSize(); 
    const {clubs, fetchClubs, clubIds, fetchClubIds} = useClubs(); 
    const isDark = JSON.parse(localStorage.getItem('isDarkTheme')); 
    const primary = `${isDark ? "rgb(0, 204, 194)" : "rgb(81, 45, 168)"}`; 

    function handleClose() {
        setOpen(false); 
    }

    async function handleClick(e) {
        const {id} = e.target; 
        const backgroundColor = e.currentTarget.style.backgroundColor
        if(backgroundColor === primary) {
            try {
                const data = {
                    userId: user.id, 
                    clubId: id, 
                    join: true
                }
                await axios.post("http://localhost:8080/user-clubs", data)
                await fetchClubIds()
                await fetchClubs()
            }
            catch (err) {
                if(err.response) {
                    console.log('Something is wrong with the server: ' + err.response.data)
                }
                else if(err.request) {
                    console.log('Something is wrong with the client')
                }
                else {
                    console.log(err)
                }
            }
        }
        else {
            setOpen(true)
            setClubId(id); 
        }
    } 

    async function handleModalClick() {
        try {
            const data = {
                userId: user.id, 
                clubId: clubId
            }
            await axios.post("http://localhost:8080/user-clubs", data)
            await fetchClubIds()
            await fetchClubs()
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
        finally {
            setOpen(false)
        }
    }

    const modal = useMemo(() => {
        return <CustomModal open={open} handleClose={handleClose} handleModalClick={handleModalClick} message={message} showTwoButtons={showTwoButtons} />
    }, [open])

    const backgroundImage = useMemo(() => {
        return (
            <Box sx={{
                position: "relative", 
                left: "-10px", 
                top: 0, 
                width: "100vw",
                height: "200px", 
                backgroundImage: "url(/images/clubs_nokia_background_image.PNG)", 
                backgroundSize: "100% 100%", 
                backgroundRepeat: "no-repeat"
            }} />
        )
    }, [isSmallScreen])

    return (
        <>
            {modal}
            {isSmallScreen ? backgroundImage : ''}
            <Box sx={{
                position: "relative", 
                top: "30px", 
                left: 0, 
                width: "100%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center"
            }}>
                <ClubsSection clubs={clubs} clubIds={clubIds} handleClick={handleClick} />
            </Box>
        </>
    )
}

export default Container