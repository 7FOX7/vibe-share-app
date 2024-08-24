import { useAuth } from "../../contexts/AuthContext"
import { useRoute } from "../../contexts/RouteContext"
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
                : <CustomNavBar />
                }
            </>
        )
    }
    return children
}

export default Layer