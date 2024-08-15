import { useMemo } from "react"
import Button from "@mui/material/Button"

const Buttons = ({activeStep, handlePrevStep, handleNextStep, handlePublish}) => {
    const buttons = useMemo(() => {
        if(activeStep === 0 || activeStep === 1) {
            return (
                <>
                    <Button onClick={handlePrevStep} disabled={activeStep === 0}>Back</Button>
                    <Button onClick={handleNextStep}>Next</Button>
                </>
            )
        }
        else {
            return (
                <>
                    <Button onClick={handlePrevStep}>Back</Button>
                    <Button onClick={handlePublish}>Publish</Button>
                </>
            )
        }
    }, [activeStep])

    return buttons
}

export default Buttons