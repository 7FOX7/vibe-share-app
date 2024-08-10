import Box from "@mui/material/Box"
import CustomAppBar from "../../customs/CustomAppbar"

const Header = () => {
  return <CustomAppBar />
}

export default Header


/*
    The goal:

1. The Header should contain three buttons: "Recent", "Popular", "Local"
2. When clicking on any of these buttons, the posts should filter


    How we can implement the filter: 

1. To get the most recent posts we can use '.sort()' method (assuming we have an array which contains the posts with 'createdDate' element or equivalent)
2. We can use the same approach to sort the posts by the number of likes; 


The goal: 

1. We need to figure out how the user will actually interact with our web app. more precisely: where the posts will be stored? and how we can access them for the user
once hes logged in
*/