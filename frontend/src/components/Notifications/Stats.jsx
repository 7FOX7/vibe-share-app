import { Fragment, memo } from "react"
import { useScreenSize } from "../../contexts/ScreenSizeContext"
import { usePosts } from "../../contexts/PostsContext"
import { useAuth } from "../../contexts/AuthContext"
import { useClubs } from "../../contexts/ClubsContext"
import { Divider } from "@mui/material"
import activityStats from "../../data/activityStats"
import Typography from "@mui/material/Typography"
import { Grid2 } from "@mui/material"

const Stats = memo(function Stats({likedPosts}) {
    const {isSmallScreen} = useScreenSize(); 
    const {user} = useAuth(); 
    const {posts} = usePosts(); 
    const {clubIds} = useClubs(); 

    const userPosts = posts.filter((post) => post.username === user.username).length; 
    const userLikes = likedPosts ? likedPosts.length : ''; 
    const userClubs = clubIds ? clubIds.length : ''; 
    const stats = [userPosts, userLikes, userClubs]

    return (
        <Grid2 container justifyContent="center" alignItems="center" sx={{
            width: `${isSmallScreen ? "100%" : "50%"}`, 
            height: `90px`,  
            backgroundColor: "contrastColors.white.main"
        }} columnSpacing={{xs: 3.5, md: 6.5, lg: 13}}>
            {activityStats.map((activity, index, arr) => {
                return (
                    <Fragment key={activity.id}>
                        <Grid2 textAlign="center" size={{xs: 2.8, md: 2.2, lg: 2}} marginTop={`${isSmallScreen ? "5px" : "20px"}`}>
                            <Typography>{stats[index]}</Typography>
                            <Typography color="primary" typography="activityStats">{activity.title}</Typography>
                        </Grid2>
                        {index !== arr.length - 1 ? <Divider orientation="vertical" /> : ''}
                    </Fragment>
                )
            })}
        </Grid2>
    )    
}) 


export default Stats