import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomModal = ({open, handleClose, message}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                width: "400px",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'contrastColors.white.main',
                border: '1px solid',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography>{message}</Typography>
                <Button onClick={handleClose}>OK</Button>
            </Box>
        </Modal>
    )
}

export default CustomModal