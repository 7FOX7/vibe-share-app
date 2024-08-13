import { useAuth } from "../../contexts/AuthContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import { ScreenHeightProvider } from "../../contexts/ScreenHeightContext"
import { usePostMode } from "../../contexts/PostModeContext"

const Layer = ({children}) => {
    const {userAdded} = useAuth(); 
    const {postMode} = usePostMode(); 
    if(!userAdded) {
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