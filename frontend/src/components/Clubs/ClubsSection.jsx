import { useState } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import ListItemText from "@mui/material/ListItemText";
import { Grid2 } from "@mui/material"; 
import CardMedia from "@mui/material/CardMedia"; 
import Card from "@mui/material/Card"; 
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import Button from "@mui/material/Button"

const ClubsSection = ({clubs, clubIds, handleClick}) => {
    const {isSmallScreen} = useScreenSize(); 
    const maxClubsVisible = isSmallScreen ? 3 : 12; 
    const [viewAll, setViewAll] = useState(false); 
    const visibleClubs = viewAll ? clubs : clubs?.slice(0, maxClubsVisible); 

    return (
        <>
            <Grid2 
            container
            columnSpacing={2}
            rowSpacing={{xs: 1.5, lg: 2}}
            columns={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4}}
        >
            {visibleClubs?.map((club) => {
                return (
                    <Grid2 container key={club.id} size={1} sx={{
                        backgroundColor: "contrastColors.white.main", 
                        border: "3px solid", 
                        borderColor: "rgba(0, 0, 0, 0.3)", 
                        borderRadius: "8px", 
                        padding: "10px"
                    }}>
                        <Grid2 
                            container 
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            columnSpacing={{xs: 1, sm: 1, md: 2, lg: 4, xl: 5}}
                        >
                            <Grid2 
                                container 
                                columnSpacing={1.2}>
                                <Card sx={{
                                    maxWidth: "55px"}}>
                                    <CardMedia 
                                        component="img"
                                        height="100%"
                                        image={club.logoUrl}
                                        alt="club image"
                                    />
                                </Card>
                                <ListItemText 
                                primary={
                                    <Typography typography="clubs.clubTitle" color="clubs.clubTitleColor">
                                        {club.title}
                                    </Typography>
                                } 
                                secondary={
                                    <Grid2 
                                        container 
                                        columnSpacing={0.5}>
                                        <GroupIcon fontSize="small"/>
                                        <Typography variant="subtitle2">
                                            {club.members} members
                                        </Typography>
                                    </Grid2>
                                } />
                            </Grid2>
                            <Grid2>
                                <Button 
                                    id={club.id} 
                                    style={{backgroundColor: `${clubIds.includes(club.id) ? "gray" : "red"}`}} 
                                    onClick={handleClick}
                                >
                                    JOIN
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                )
            })}
        </Grid2>
        {!viewAll && 
        <Grid2 sx={{marginTop: "25px"}}>
            <Link 
                component="button" 
                typography={isSmallScreen ? "clubs.viewAll_mobile" : "clubs.viewAll_desktop"} 
                onClick={() => setViewAll(true)}
            >
                View All
            </Link>
        </Grid2>}
        </>
    )
}

export default ClubsSection

/*
    <List sx={{width: "100%"}}>
        {clubs?.map((club) => {
            return (
                <ListItem disablePadding sx={{
                    backgroundColor: "contrastColors.white.main"
                }}>
                    <Grid2 
                        container 
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Grid2 
                            container 
                            width="63%"
                            columnSpacing={1.2}>
                            <Card sx={{
                                maxWidth: "55px"}}>
                                <CardMedia 
                                    component="img"
                                    height="100%"
                                    image={club.logoUrl}
                                    alt="club image"
                                />
                            </Card>
                            <ListItemText 
                            primary={
                                <Typography fontSize="1.15rem" fontWeight="600" sx={{
                                    color: "rgba(0, 0, 0, 0.8)"
                                }}>
                                    {club.title}
                                </Typography>
                            } 
                            secondary={
                                <Typography variant="subtitle2">
                                    {club.members} members
                                </Typography>
                            } />
                        </Grid2>
                        <Grid2>
                            <ListItemButton 
                                id={club.id} 
                                style={{backgroundColor: `${clubIds.includes(club.id) ? "gray" : "red"}`}} 
                                onClick={handleClick}
                            >
                                JOIN
                            </ListItemButton>
                        </Grid2>
                    </Grid2>
                </ListItem>
            )
        })}
        </List>


        {clubs.map((club) => {
                return (
                    <Box key={club.id} sx={{
                        display: "flex", 
                        width: "100%", 
                        justifyContent: "space-between"
                    }}>
                        <span>{club.title}</span>
                        <Button id={club.id} style={{backgroundColor: `${clubIds.includes(club.id) ? "gray" : "red"}`}} onClick={handleClick}>Im a button</Button>
                        <img src={club.logoUrl} width="50px" height="50" />
                    </Box>
                )
            })}
*/