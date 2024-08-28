import { useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import navBarRoutes from "../../data/navBarRoutes"

const Layer = ({children}) => {
    const {authSucceeded} = useAuth(); 
    const location = useLocation();
    if(authSucceeded) {
        return (
            <>
                <CustomAppBar />
                {children}
                {navBarRoutes.includes(location.pathname) && <CustomNavBar />}
            </>
        )
    }
    return children
}

export default Layer