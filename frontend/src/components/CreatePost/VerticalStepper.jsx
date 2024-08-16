import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRoute } from "../../contexts/RouteContext"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Typography from "@mui/material/Typography"
import stepLabels from "../../data/stepLabels"
import Content from "./Content"
import Buttons from "./Buttons"
import CustomBackdrop from "../../customs/CustomBackdrop"
import axios from "axios"

const VerticalStepper = () => {
    const {setRoute} = useRoute(); 
    const [loading, setLoading] = useState(false); 
    const [activeStep, setActiveStep] = useState(0); 
    const navigate = useNavigate(); 

    function handleNextStep() {
        setActiveStep((prevStep) => prevStep + 1)
    }

    function handlePrevStep() {
        setActiveStep((prevStep) => prevStep - 1)
    }

    async function handlePublish() {
        const storedContent = sessionStorage.getItem('content') 
        const storedImage = sessionStorage.getItem('image')
        const currentDate = new Date().toISOString().split('T')[0]

        const postData = {
            publishDate: currentDate, 
            content: storedContent, 
            imageUrl: storedImage, 
        }
        if(storedContent && storedImage) {
            setLoading(true)
            try { 
                const response = await axios.post("http://localhost:8080/posts", postData)
                console.log(response.statusText)
                await new Promise((resolve) => setTimeout(resolve, 500))
            }
            catch (err) {
                if(err.response) {
                    console.log('Something is wrong with the server: ' + err.response.data)
                }
                else if(err.request) {
                    console.log('Something is wrong with the client')
                }
                else {
                    console.log(err)
                }
            }
            finally {
                setActiveStep((prevStep) => prevStep + 1)
                setLoading(false)
                setRoute('home')
                navigate('/', {relative: "route"})
            }
        }
        else {
            alert('Please, make sure to submit at least one image and a text')
        }
    }

    return (
        <>
            {loading ? <CustomBackdrop /> : ''}
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
                                <Buttons activeStep={activeStep} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} handlePublish={handlePublish} />
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
        </>
    )
}

export default VerticalStepper