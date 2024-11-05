import { usePosts } from "../../contexts/PostsContext";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { Grid2, Typography } from "@mui/material"; 
import CardMedia from "@mui/material/CardMedia"; 
import Card from "@mui/material/Card"; 
import formatPostPublishDate from "../../utils/functions/formatPostPublishDate";

const LocalPosts = memo(function LocalPosts() {
    const {geolocationFilteredPosts} = usePosts();
    const theme = useTheme()
    const localPostsSorted = [...geolocationFilteredPosts]?.sort((currentPost, nextPost) => new Date(nextPost.publishDate) - new Date(currentPost.publishDate))
    return (    
        <List>
            {localPostsSorted.map((localPost) => {
                return (
                    <Fragment key={localPost.id}>
                        <Divider component="li" />
                        <ListItem disableGutters sx={{color: theme.palette.notifications.localPostsText.main}}>
                            <ListItemButton 
                                disableGutters
                                component={Link}
                                to={`/post-view/${localPost.id}/${localPost.username}`}>
                                <Grid2 
                                    container 
                                    width="100%"
                                    alignItems="center"
                                    columnSpacing={{xs: 2, sm: 2, md: 2, lg: 8, xl: 8}}
                                >
                                    <Grid2 container alignItems="center" columnSpacing={1.2}>
                                        <CampaignRoundedIcon />
                                        <ListItemText primary="Someone has posted near you" secondary={<Typography variant="body2" color="primary">{formatPostPublishDate(localPost.publishDate)}</Typography>} />
                                    </Grid2>
                                    <Card sx={{width: "55px"}}>
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
                    </Fragment>
                )
            })}
        </List>
    )
}) 

export default LocalPosts