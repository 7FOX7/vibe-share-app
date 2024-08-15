import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CustomBackdrop = () => {
    return (
        <>
            <Backdrop open color="primary" sx={{zIndex: "10"}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default CustomBackdrop