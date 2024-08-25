import { useState, createContext, useContext } from "react";

const PostAuthorContext = createContext(''); 

export const PostAuthorProvider = ({children}) => {
    const [author, setAuthor] = useState(''); 

    return <PostAuthorContext.Provider value={{author, setAuthor}}>{children}</PostAuthorContext.Provider>
}

export const usePostAuthor = () => {
    return useContext(PostAuthorContext)
}