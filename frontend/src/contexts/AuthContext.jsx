import {useState, useEffect, createContext, useContext} from "react"
import axios from "axios"
import { nanoid } from "nanoid"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 
    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null); 

    useEffect(() => {
        axios.get("/users.json")
        .then(response => setUsers(response.data))
    }, [])

    useEffect(() => {
        if(users) {
            if(users.length === 0) {
                updateUsers(); 
            }
            else {
                users.map((_user) => {
                    _user.username === user[0] ? setPosts(_user.posts) : updateUsers()
                })
            }
        }
    }, [user])

    async function updateUsers() {
        const userData = {
            id: nanoid(11), 
            username: user[0], 
            password: user[1]
        }

        localStorage.setItem("userData", JSON.stringify(userData)); 
        axios.put("/users.json", JSON.stringify(userData))
        .then(response => console.log(response))
        .catch(error => console.log(error.message))
    }

    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}