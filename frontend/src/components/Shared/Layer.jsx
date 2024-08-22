import { useAuth } from "../../contexts/AuthContext"
import { useRoute } from "../../contexts/RouteContext"
import { ScreenHeightProvider } from "../../contexts/ScreenHeightContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import noNavBarRoutes from "../../data/noNavBarRoute"

const Layer = ({children}) => {
    const {authSucceeded} = useAuth(); 
    const {route} = useRoute(); 
    if(authSucceeded) {
        return (
            <>
                <CustomAppBar />
                {children}
                {noNavBarRoutes.includes(route) ? 
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