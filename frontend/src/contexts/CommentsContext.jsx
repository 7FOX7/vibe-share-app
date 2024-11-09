import { useState, createContext, useContext } from "react"; 
import axios from "axios";

const CommentsContext = createContext(null); 

export const CommentsProvider = ({children}) => {
    const [comments, setComments] = useState(''); 

    async function fetchComments(id, postType) {
        try {
            const response = await axios.get(`http://localhost:8080/comments`, {
                params: {
                    id: id, 
                    postType: postType
                }
            }); 
            for(let val of response.data) {
                val.username = val.username.username
            }
            setComments(response.data)
            console.log('comments were fetched successfully: ' +  response.statusText)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    async function sendComments(postData) {
        try {
            const response = await axios.post(`http://localhost:8080/comments`, postData); 
            for(let val of response.data) {
                val.username = val.username.username
            }
            for(let val of response.data) {
                console.log(val)
            }
            setComments(response.data)
            console.log('comments were posted successfully: ' + response.statusText)
        }
        catch (err) {
            if(err.response) {
                console.log('Something is wrong with the server: ' + err.response.data)
            }
            else if(err.request) {
                console.log('Something is wrong with the client')
            }
            else {
                console.log(err)
            }
        }
    }

    return <CommentsContext.Provider value={{comments, setComments, fetchComments, sendComments}}>{children}</CommentsContext.Provider>
}

export const useComments = () => {
    return useContext(CommentsContext); 
}