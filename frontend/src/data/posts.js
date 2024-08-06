import { nanoid } from "nanoid"

const posts = [
    {
        id: nanoid(8), 
        name: "some name", 
        author: "some author", 
        createdDate: new Date(1998, 0, 10)
    }, 
    {
        id: nanoid(8), 
        name: "another name", 
        author: "another author", 
        createdDate: new Date(1995, 10, 10)
    }, 
    {
        id: nanoid(8), 
        name: "one more name", 
        author: "one more author", 
        createdDate: new Date(1993, 10, 10)
    }, 
    {
        id: nanoid(8), 
        name: "the last name", 
        author: "the last author", 
        createdDate: new Date(2000, 10, 10)
    }
]

export default posts