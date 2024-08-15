import { useAuth } from "../../contexts/AuthContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import { ScreenHeightProvider } from "../../contexts/ScreenHeightContext"
import { usePostMode } from "../../contexts/PostModeContext"

const Layer = ({children}) => {
    const {authSucceded} = useAuth(); 
    const {postMode} = usePostMode(); 
    // ! ! !  dont forget to remove '!' when you want to test app with 'Registration' 
    if(!authSucceded) {
        return (
            <>
                <CustomAppBar />
                {children}
                {postMode ? 
                '' 
                : <ScreenHeightProvider>
                    <CustomNavBar />
                </ScreenHeightProvider> 
                }
            </>
        )
    }
    return children
}

export default Layer