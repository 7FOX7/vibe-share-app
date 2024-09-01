import { Suspense, lazy } from "react";

const Box = lazy(() => import("@mui/material/Box")); 
const Container = lazy(() => import("../components/Clubs/Container")); 

const Clubs = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{
                width: "100%", 
                height: "100vh", 
                backgroundColor: "secondary.main", 
                paddingInline: "10px", 
                paddingTop: "50px"
            }}>
                <Container />
            </Box>
        </Suspense>
    )
}

export default Clubs


/*
    <Clubs>
        <Container>

        
    </Clubs>
    

    1. ClubsContext - which will provide us with ALL the clubs from 'clubs' table; 
    2. assuming we have: 

        userClubs array which contains only the clubId's (3, 4, 20, 100, 5)

        when we iterate through the clubs, we are going to compare if the clubId is already in the userClubs array. 
        to illustrate: 

        clubs.map((club) => {
            return <button bg={userClubs.inludes(club.id)}></button>    
        })


*/