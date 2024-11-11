import { useState, useEffect, createContext, useContext } from "react";
import _axios from "../../axios.config";

const ClubsContext = createContext(null); 

export const ClubsProvider = ({children}) => {
    const [clubs, setClubs] = useState(''); 
    const [clubIds, setClubIds] = useState(''); 

    useEffect(() => {
        fetchClubs()
    }, [])

    async function fetchClubs() {
        try {
            const response = await _axios.get("/clubs")
            setClubs(response.data)
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.error('Something is wrong with the client')
            }
            else {
                console.error(err)
            }
        }
    }

    async function fetchClubIds(userId) {
        try {
            const response = await _axios.get("/user-clubs", {
                params: {
                    userId
                }
            })
            const clubIds = response.data.map((club) => club.clubId) // we are using 'map' because we want to get an ARRAY of club ids
            setClubIds(clubIds)
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.error('Something is wrong with the client')
            }
            else {
                console.error(err)
            }
        }
    }    

    return <ClubsContext.Provider value={{clubs, fetchClubs, clubIds, fetchClubIds}}>{children}</ClubsContext.Provider>
}

export const useClubs = () => {
    return useContext(ClubsContext)
}