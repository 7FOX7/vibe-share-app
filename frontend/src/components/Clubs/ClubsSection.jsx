import { useState } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useTheme } from "@emotion/react";
import ListItemText from "@mui/material/ListItemText";
import { Grid2 } from "@mui/material"; 
import CardMedia from "@mui/material/CardMedia"; 
import Card from "@mui/material/Card"; 
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import Button from "@mui/material/Button"

const ClubsSection = ({clubs, clubIds, handleClick, isDisabled}) => {
    const [viewAll, setViewAll] = useState(false); 
    const {isSmallScreen} = useScreenSize(); 
    const theme = useTheme(); 
    const maxClubsVisible = isSmallScreen ? 3 : 12; 
    const visibleClubs = viewAll ? clubs : clubs?.slice(0, maxClubsVisible); 
    const clubsCopy = [...visibleClubs].sort((current, next) => next.members - current.members)
    return (
        <>
            <Grid2 
                container
                columnSpacing={2}
                rowSpacing={{xs: 1.5, lg: 2}}
                columns={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4}}
            >
            {clubsCopy?.map((club) => {
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
                                        <Typography component="div">
                                            <Grid2 
                                            container 
                                            columnSpacing={0.5}
                                            >
                                                <GroupIcon fontSize="small"/>
                                                <Typography variant="subtitle2">
                                                    {club.members} members
                                                </Typography>
                                            </Grid2>
                                        </Typography>
                                    } 
                                />
                            </Grid2>
                            <Grid2>
                                <Button 
                                    id={club.id}
                                    aria-disabled={isDisabled} 
                                    style={{backgroundColor: `${clubIds.includes(club.id) ? "rgb(150, 150, 150)" : theme.palette.primary.main}`}} 
                                    onClick={handleClick}
                                    sx={{
                                        color: "contrastColors.white.main", 
                                        ":disabled": {
                                            cursor: "default", 
                                            color: "rgb(180, 180, 180)",
                                            backgroundColor: "rgba(0, 0, 0, 0.2)" 
                                        }
                                    }}
                                    disabled={isDisabled}
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
        <Grid2 sx={{
            marginTop: "25px", 
            height: "25vh"
        }}>
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