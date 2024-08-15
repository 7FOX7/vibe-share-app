import {useState, useEffect, createContext, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext('default')

export const AuthProvider = ({children}) => {
    // TODO: dont forget to set user to null
    const [user, setUser] = useState(null); 
    const [users, setUsers] = useState(null); 
    const [authSucceded, setAuthSucceded] = useState(false); 

    const navigate = useNavigate(); 
    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(() => {
        if(user) {
            const isLoginMode = user.isLoginMode
            isLoginMode ? handleLogin(user) : handleRegister(user) 
        } 
    }, [user])

    function handleRegister(user) {
        const requestedUsername = user.username; 
        const existingUsername = users.find(_user => _user.username === requestedUsername)
        if(typeof(existingUsername) === "undefined") {
            updateUsers(); 
            setAuthSucceded(true)
            navigate("/", {relative: "route"})
        }
        else {
            alert('this username already exists!')
        }
    }

    function handleLogin(user) {
        const {isLoginMode, ...userData} = user; 
        const requestedUsername = userData.username

        const existingUser = users.find(_user => _user.username === requestedUsername)
        if(typeof(existingUser) !== "undefined" && existingUser.password === userData.password) {
            setAuthSucceded(true)
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
            console.log('Data was fetched successfully: ' +  response.statusText) 
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

    // async function checkUsernameAvailability() {
    //     if(user) {
    //         const requestedUsername = user.username; 
    //         const existingUsername = users.find(_user => _user.username === requestedUsername)
    //         if(typeof(existingUsername) === "undefined") {
    //             updateUsers(); 
    //             setUserAdded(true)
    //             navigate("/", {relative: "route"})
    //         }
    //         else {
    //             alert('this username already exists!')
    //         }
    //     }

    //     if(user) {
    //         const isLoginMode = user.isLoginMode
    //         const requestedUsername = user.username; 
    //         const existingUsername = await users.find(_user => _user.username === requestedUsername)
    //         if(typeof(existingUsername) === "undefined") {
    //             if(!isLoginMode) {    
    //                 updateUsers(); 
    //                 setUserAdded(true)
    //                 navigate("/", {relative: "route"})
    //             }
    //             else {
    //                 const matchingPassword = await users.find(_)
    //             }
    //         }
    //         else {
    //             alert('this username already exists!')
    //         }
    //     }
    // }

    return <AuthContext.Provider value={{user, setUser, authSucceded}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext); 
}