import { Fragment, memo } from "react"
import { useScreenSize } from "../../contexts/ScreenSizeContext"
import { usePosts } from "../../contexts/PostsContext"
import { useAuth } from "../../contexts/AuthContext"
import { useClubs } from "../../contexts/ClubsContext"
import { Divider } from "@mui/material"
import activityStats from "../../data/activityStats"
import Typography from "@mui/material/Typography"
import { Grid2 } from "@mui/material"
import Box from "@mui/material/Box"

const Stats = memo(function Stats({likedPosts}) {
    const {isSmallScreen} = useScreenSize(); 
    const {user} = useAuth(); 
    const {posts} = usePosts(); 
    const {clubIds} = useClubs(); 

    const userPosts = posts.filter((post) => post.username === user.username).length; 
    const userLikes = likedPosts ? likedPosts : 0; 
    const userClubs = clubIds ? clubIds.length : 0; 
    const stats = [userPosts, userLikes, userClubs]

    return (
        <Grid2 
            container 
            justifyContent="center" 
            alignItems="center" 
            sx={{
                width: `${isSmallScreen ? "95%" : '50%'}`, 
                height: `${isSmallScreen ? "90px" : "180px"}`,  
                backgroundColor: "contrastColors.white.main"
            }} 
            columnSpacing={{xs: 3.5, sm: 4, md: 6.5, lg: 13, xl: 16}}>
            {activityStats.map((activity, index, arr) => {
                return (
                    <Fragment key={activity.id}>
                        <Grid2 size={{xs: 2.8, md: 2.5, lg: 2}} marginTop={`${isSmallScreen ? "5px" : "10px"}`}>
                            <Grid2 sx={{
                                textAlign: "center", 
                                width: `${!isSmallScreen ? "40px" : "auto"}`,
                            }}>
                                {!isSmallScreen && 
                                <Box sx={{
                                    backgroundImage: `url(${activity.wideScreenImageUrl})`, 
                                    width: "30px", 
                                    height: "30px", 
                                    backgroundSize: "100% 100%",
                                    marginBottom: "10px",
                                    marginLeft: "5px" 
                                }} />}
                                <Typography>{stats[index]}</Typography>
                                <Typography color="primary" typography="notifications.activityStats">{activity.title}</Typography>
                            </Grid2>
                        </Grid2>
                        {index !== arr.length - 1 ? <Divider orientation="vertical" /> : ''}
                    </Fragment>
                )
            })}
        </Grid2>
    )    
}) 


export default Stats