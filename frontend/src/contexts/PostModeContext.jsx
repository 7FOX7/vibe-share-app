import { useState, createContext, useContext } from "react";

const PostModeContext = createContext(false)

export const PostModeProvider = ({children}) => {
    const [postMode, setPostMode] = useState(false); 

    return <PostModeContext.Provider value={{postMode, setPostMode}}>{children}</PostModeContext.Provider>
}

export const usePostMode = () => {
    return useContext(PostModeContext)
}