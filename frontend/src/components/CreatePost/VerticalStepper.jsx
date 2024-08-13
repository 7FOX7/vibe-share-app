import { useState } from "react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Typography from "@mui/material/Typography"
import stepLabels from "../../data/stepLabels"
import Content from "./Content"
import Buttons from "./Buttons"

const VerticalStepper = () => {
    const [activeStep, setActiveStep] = useState(0); 
    function handleNextStep() {
        setActiveStep((prevStep) => prevStep + 1)
    }

    function handlePrevStep() {
        setActiveStep((prevStep) => prevStep - 1)
    }

    return (
        <>
            <Stepper orientation="vertical" activeStep={activeStep} sx={{width: "80%"}}>
                {stepLabels.map(stepLabel => {
                    return (
                        <Step key={stepLabel.id}>
                            <StepLabel>
                                <Typography typography="stepLabel">
                                    {stepLabel.label}
                                </Typography>    
                            </StepLabel>
                            <StepContent>
                                <Content activeStep={activeStep} />
                                <Buttons handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} stepLabels={stepLabels} activeStep={activeStep} />
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
        </>
    )
}

export default VerticalStepper