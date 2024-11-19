import {useState, useEffect, createContext, useContext} from "react"
import { useNavigate } from "react-router-dom"
import _axios from "../../axios.config"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 
    const [users, setUsers] = useState(null); 
    const [isLoginMode, setIsLoginMode] = useState(false); 
    const [authSucceeded, setAuthSucceeded] = useState(false);
    const navigate = useNavigate(); 
    
    useEffect(() => {
        fetchData()
    }, [])

    function isValidLength(user) {
        return user.length <= 12
    }

    async function handleLoginRegistration(username, password) {
        if(isLoginMode) {
            const existingUser = users.find(_user => _user.username === username)
            if(typeof(existingUser) !== "undefined" && existingUser.password === password) {
                setUser(existingUser)
                setAuthSucceeded(true)
                navigate("/", {relative: "route"})
            }
            else {
                alert('User is not found')
            }
        }
        else {
            try {
                const existingUser = users.find(_user => _user.username === username)
                if(typeof(existingUser) === "undefined") {
                    if(isValidLength(username)) {    
                        await updateUsers(username, password);
                        setAuthSucceeded(true) 
                        navigate("/", {relative: "route"})
                    }
                    else {
                        alert('The username contains too many characters')
                    }
                }
                else {
                    alert('This username already exists')
                }
            }
            catch (err) {
                console.error(err)
            }
        }
    }

    async function fetchData() {
        try {
            const response = await _axios.get("/users")
            setUsers(response.data); 
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server')
            }
            else if(err.request) {
                console.error('Something is wrong with the client')
            }
            else {
                console.error(err)
            }
        }
    }

    async function updateUsers(username, password) {  
        try {
            const userData = {
                username, 
                password
            }

            const response = await _axios.post(`/users`, userData)
            const users = response.data
            const newUser = users.find(_user => _user.username === userData.username)
            setUser(newUser)
            setUsers(users); 
        }
        catch(err) {
            if(err.response) {
                console.error('Something is wrong with the server')
            }
            else if(err.request) {
                console.error('Something is wrong with the client')
            }
            else {
                console.error(err)
            }
        }
    }

    return <AuthContext.Provider value={{user, isLoginMode, setIsLoginMode, authSucceeded, handleLoginRegistration}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}