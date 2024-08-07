import {useState, useEffect, createContext, useContext} from "react"
import axios from "axios"
import { nanoid } from "nanoid"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetchData()
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

    async function fetchData() {
        axios.get("http://localhost:8080/users", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => setUsers(response))
    }

    async function updateUsers() {
        const userData = {
            id: nanoid(11), 
            username: user[0], 
            password: user[1]
        }

        axios.put("/users", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error.message))
    }

    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}