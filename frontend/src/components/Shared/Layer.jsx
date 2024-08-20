import { useAuth } from "../../contexts/AuthContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import { ScreenHeightProvider } from "../../contexts/ScreenHeightContext"
import { useRoute } from "../../contexts/RouteContext"

const Layer = ({children}) => {
    const {authSucceeded} = useAuth(); 
    const {route} = useRoute(); 
    // ! ! !  dont forget to remove '!' when you want to test app with 'Registration' 
    if(authSucceeded) {
        return (
            <>
                <CustomAppBar />
                {children}
                {route === "create-post" || route === "post-view" ? 
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