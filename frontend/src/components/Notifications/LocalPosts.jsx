import { memo } from "react";
import { usePosts } from "../../contexts/PostsContext";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { Grid2 } from "@mui/material"; 
import CardMedia from "@mui/material/CardMedia"; 
import Card from "@mui/material/Card"; 
import formatPostPublishDate from "../../utils/functions/formatPostPublishDate";

const LocalPosts = memo(function LocalPosts() {
    console.log('LocalPosts was run!')
    const {geolocationFilteredPosts} = usePosts();
    const localPostsSorted = [...geolocationFilteredPosts]?.sort((currentPost, nextPost) => new Date(nextPost.publishDate) - new Date(currentPost.publishDate))
    return (    
        <List>
            {localPostsSorted.map((localPost) => {
                return (
                    <>
                        <Divider component="li" />
                        <ListItem disableGutters>
                            <ListItemButton 
                                disableGutters
                                component={Link}
                                to={`/post-view/${localPost.id}/${localPost.username}`}>
                                <Grid2 
                                    container 
                                    width="100%"
                                    alignItems="center"
                                    columnSpacing={{xs: 2, md: 6, lg: 15, xl: 20}}
                                >
                                    <Grid2 container alignItems="center" columnSpacing={1.2}>
                                        <CampaignRoundedIcon />
                                        <ListItemText primary="Someone has posted near you" secondary={formatPostPublishDate(localPost.publishDate)} />
                                    </Grid2>
                                    <Card sx={{maxWidth: "55px"}}>
                                        <CardMedia 
                                            component="img"
                                            height="60px"
                                            image={`${localPost.imageUrl}`}
                                            alt="post image"
                                        />
                                    </Card>
                                </Grid2>
                            </ListItemButton>
                        </ListItem>
                        <Divider component="li" />
                    </>
                )
            })}
        </List>
    )
}) 

export default LocalPosts