import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Grid2 } from "@mui/material"; 
import CardMedia from "@mui/material/CardMedia"; 
import Card from "@mui/material/Card"; 
import ListItemButton from "@mui/material/ListItemButton";
import formatPublishDate from "../../utils/functions/formatPublishDate";
import Typography from "@mui/material/Typography";

const ChatList = ({chats}) => {
    return (    
        <List>
            {chats?.map((chat) => {
                const commentContent = chat.commentContent.length >= 15 ? chat.commentContent.substring(0, 15) : chat.commentContent 
                return (
                    <ListItem key={chat.commentId} disableGutters>
                    <ListItemButton 
                        disableGutters
                        component={Link}
                        to={`/comments/post/${chat.postId}/${chat.authorUsername}`}
                    >
                        <Grid2 
                            container 
                            width="100%"
                            justifyContent="space-between"
                            columnSpacing={{xs: 2, sm: 1, md: 2, lg: 5}}
                        >
                            <Grid2 
                                container 
                                columnSpacing={1.2}>
                                <Card sx={{
                                    maxWidth: "55px"}}>
                                    <CardMedia 
                                        component="img"
                                        height="100%"
                                        image={chat.imageUrl}
                                        alt="post image"
                                    />
                                </Card>
                                <ListItemText 
                                primary={
                                    <Typography typography="chats.authorUsername" color="chats.authorUsernameColor.main">
                                        {chat.authorUsername}
                                    </Typography>
                                } 
                                secondary={
                                    <Typography variant="subtitle2" color="chats.commentContent.main">
                                        {commentContent} ...
                                    </Typography>
                                } />
                            </Grid2>
                            <Grid2>
                                <ListItemText primary={
                                    <Typography typography="chats.publishDate">
                                        {formatPublishDate(chat.commentPublishDate)}
                                    </Typography>
                                } />
                            </Grid2>
                        </Grid2>
                    </ListItemButton>
                </ListItem>
                )
            })}
        </List>
    )
}

export default ChatList