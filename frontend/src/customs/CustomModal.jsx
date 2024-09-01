import { useScreenSize } from "../contexts/ScreenSizeContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomModal = ({open, handleClose, handleModalClick='', message, showTwoButtons=false}) => {
    const {isSmallScreen} = useScreenSize(); 
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                alignItems: "center", 
                width: `${isSmallScreen ? "350px" : "400px"}`,
                backgroundColor: 'contrastColors.white.main',
                border: '1px solid',
                boxShadow: 24,
                padding: "20px 32px",
            }}>
                <Box sx={{width: "fit-content"}}>
                    <Typography>{message}</Typography>
                </Box>
                {showTwoButtons ? 
                    <Box sx={{width: "fit-content", marginTop: "10px"}}>
                        <Button onClick={handleClose}>NO</Button>
                        <Button onClick={handleModalClick}>YES</Button>
                    </Box>
                    : 
                    <Box sx={{width: "fit-content", marginTop: "10px"}}>
                        <Button onClick={handleClose}>OK</Button>
                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default CustomModal