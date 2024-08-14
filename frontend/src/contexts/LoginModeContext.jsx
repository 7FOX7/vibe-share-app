import { useState, createContext, useContext } from "react";

const LoginModeContext = createContext(false)

export const LoginModeProvider = ({children}) => {
    const [isLoginMode, setIsLoginMode] = useState(false)

    return <LoginModeContext.Provider value={{isLoginMode, setIsLoginMode}}>{children}</LoginModeContext.Provider>
}

export const useLoginMode = () => {
    return useContext(LoginModeContext)
}