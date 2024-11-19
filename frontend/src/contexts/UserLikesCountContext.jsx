import { useState, createContext, useContext, useEffect} from "react";
import { useAuth } from "./AuthContext";
import _axios from "../../axios.config"

const UserLikesCountContext = createContext(0); 

export const UserLikesCountProvider = ({children}) => {
    const [userLikesCount, setUserLikesCount] = useState(0);
    const {user} = useAuth()

    useEffect(() => {
        if(user) fetchUserLikes(user.id)

        // return () => {
        //     setUserLikesCount(0)
        // }
    }, [user])

    async function fetchUserLikes(id) {
        try {
            const response = await _axios.get('/likes', {
                params: {
                    userId: id, 
                    getCount: true
                }
            })
            
            setUserLikesCount(response.data)
        }
        catch(err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.error('Something is wrong with the client: ' + err)
            }
            else {
                console.error(err)
            }
        }
    }   

    return <UserLikesCountContext.Provider value={{userLikesCount, setUserLikesCount}}>{children}</UserLikesCountContext.Provider>
}

export const useUserLikesCount = () => {
    return useContext(UserLikesCountContext)
}