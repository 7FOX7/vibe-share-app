import {useState, useEffect, createContext, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    // TODO: dont forget to set user to null
    const [user, setUser] = useState(null); 
    const [users, setUsers] = useState(null); 
    const [userAdded, setUserAdded] = useState(false); 

    const navigate = useNavigate(); 

    console.log('users: ' + users)
    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(() => {
        checkUsernameAvailability(); 
    }, [user])

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8080/users")
            setUsers(response.data);
            console.log('Data was fetched successfully: ' +  response.statusText) 
        }
        catch(error) {
            if(error.response) {
                console.log('Something is wrong with the server')
            }
            else if(error.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(error)
            }
        }
    }

    async function updateUsers() { 
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; 
        const userData = {
            id, 
            username: user.username, 
            password: user.password
        }

        try {
            const response = await axios.post(`http://localhost:8080/users`, userData)
            setUsers(response.data); 
        }
        catch(error) {
            if(error.response) {
                console.log('Something is wrong with the server')
            }
            else if(error.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(error)
            }
        }
    }

    function checkUsernameAvailability() {
        if(user) {
            const requestedUsername = user.username; 
            const existingUsername = users.find(_user => _user.username === requestedUsername)
            if(typeof(existingUsername) === "undefined") {
                updateUsers(); 
                setUserAdded(true)
                navigate("/", {relative: "route"})
            }
            else {
                alert('this username already exists!')
            }
        }
    }

    return <AuthContext.Provider value={{user, setUser, userAdded}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}