import {useState, useEffect, createContext, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    // TODO: dont forget to set user to null
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
                alert('The username contains too many characters!')
            }
        }
        else {
            alert('The username already exists!')
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
            alert('user is not found!')
        }
    }

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8080/users")
            setUsers(response.data);
            console.log('user data was fetched successfully: ' +  response.statusText) 
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
        const userData = {
            username: user.username, 
            password: user.password
        }

        try {
            const response = await axios.post(`http://localhost:8080/users`, userData)
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