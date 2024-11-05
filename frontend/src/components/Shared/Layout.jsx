import { useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import CustomAppBar from "../../customs/CustomAppBar"
import CustomNavBar from "../../customs/CustomNavBar"
import navBarRoutes from "../../data/navBarRoutes"

const Layout = ({children, setIsDarkTheme}) => {
    const {authSucceeded} = useAuth(); 
    const location = useLocation();
    console.log('layer is renrendered')
    if(authSucceeded) {
        return (
            <>
                <CustomAppBar setIsDarkTheme={setIsDarkTheme} />
                {children}
                {navBarRoutes.includes(location.pathname) && <CustomNavBar />}
            </>
        )
    }
    return children
}

export default Layout