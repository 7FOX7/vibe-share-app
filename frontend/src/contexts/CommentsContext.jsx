import { useState, createContext, useContext } from "react"; 
import _axios from "../../axios.config";

const CommentsContext = createContext(null); 

export const CommentsProvider = ({children}) => {
    const [comments, setComments] = useState(''); 

    async function fetchComments(id, postType) {
        try {
            const response = await _axios.get(`/comments`, {
                params: {
                    id: id, 
                    postType: postType
                }
            }); 
            for(let val of response.data) {
                val.username = val.username.username
            }
            setComments(response.data)
            console.error('comments were fetched successfully: ' +  response.statusText)
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

    async function sendComments(postData) {
        try {
            const response = await _axios.post(`/comments`, postData); 
            console.error('comments were posted successfully: ' + response.statusText)
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

    return <CommentsContext.Provider value={{comments, setComments, fetchComments, sendComments}}>{children}</CommentsContext.Provider>
}

export const useComments = () => {
    return useContext(CommentsContext); 
}