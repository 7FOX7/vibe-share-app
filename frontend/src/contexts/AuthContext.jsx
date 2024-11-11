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
    
    useEffect(() => {
        if(user && !authSucceeded) {
            isLoginMode ? handleLogin(user) : handleRegister(user) 
        } 
    }, [user])

    function handleRegister(user) {
        const {username} = user
        const existingUser = users.find(_user => _user.username === username)
        if(typeof(existingUser) === "undefined") {
            if(isValidLength(username)) {    
                updateUsers();
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

    function isValidLength(user) {
        return user.length <= 12
    }

    function handleLogin(user) {
        const {username, password} = user
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

    async function fetchData() {
        try {
            const response = await _axios.get("/users")
            setUsers(response.data); 
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server')
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    async function updateUsers() {  
        try {
            const userData = {
                username: user.username, 
                password: user.password
            }

            const response = await _axios.post(`/users`, userData)
            const users = response.data
            const newUser = users.find(_user => _user.username === userData.username)
            setUser(newUser)
            setUsers(users); 
        }
        catch(err) {
            if(err.response) {
                console.log('Something is wrong with the server')
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    return <AuthContext.Provider value={{user, setUser, isLoginMode, setIsLoginMode, authSucceeded}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}