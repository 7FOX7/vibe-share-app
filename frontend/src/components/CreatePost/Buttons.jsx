import { Box, Button } from "@mui/material"

const Buttons = ({handlePrevStep, handleNextStep, stepLabels, activeStep}) => {
    return (
        <Box sx={{
            display: "flex"
        }}>
            <Button onClick={handlePrevStep} disabled={activeStep === 0}>Back</Button>
            <Button onClick={handleNextStep}>{activeStep === stepLabels.length - 1 ? "Publish" : "Next"}</Button>
        </Box>
    )
}

export default Buttons