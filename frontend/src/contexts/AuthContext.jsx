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
                return
            }
            users.map(_user => _user.username === user[0] ? '' : updateUsers())
        }
    }, [user])

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8080/users", {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setUsers(response);
            console.log('connection was successful to the users') 
        }
        catch(error) {
            console.error(error.message)
        }
    }

    async function updateUsers() {
        const userData = {
            id: nanoid(11), 
            username: user[0], 
            password: user[1]
        }

        try {
            const response = await axios.put("http://localhost:8080/users", userData)
            console.log('data was put successfully ' + response)
        }
        catch(error) {
            console.error('There was an error: ' + error.message)
        }
    }

    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}