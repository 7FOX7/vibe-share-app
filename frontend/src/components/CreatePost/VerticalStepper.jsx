import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { usePosts } from "../../contexts/PostsContext"
import { useGeolocation } from "../../contexts/GeolocationContext"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Typography from "@mui/material/Typography"
import stepLabels from "../../data/stepLabels"
import Content from "./Content"
import Buttons from "./Buttons"
import CustomBackdrop from "../../customs/CustomBackdrop"
import _axios from "../../../axios.config"
import arrayBufferToFile from "../../utils/functions/arrayBufferToFile"
import base64ToArrayBuffer from "../../utils/functions/base64ToArrayBuffer"

const VerticalStepper = () => {
    const [loading, setLoading] = useState(false); 
    const [activeStep, setActiveStep] = useState(0);
    const {user} = useAuth(); 
    const {setPosts, setGeolocationFilteredPosts} = usePosts(); 
    const {geolocation} = useGeolocation(); 
    const navigate = useNavigate(); 
    const theme = useTheme(); 

    function handleNextStep() {
        setActiveStep((prevStep) => prevStep + 1)
    }

    function handlePrevStep() {
        setActiveStep((prevStep) => prevStep - 1)
    }

    async function handlePublish() {
        const storedContent = sessionStorage.getItem('content') 
        const storedFileData = JSON.parse(sessionStorage.getItem('fileData'))

        if(storedContent && storedFileData) {
            setLoading(true)
            const {base64, fileName} = storedFileData; 
            const arrayBuffer = base64ToArrayBuffer(base64)
            const file = arrayBufferToFile(arrayBuffer, fileName)
            const formData = new FormData();
            formData.append('image', file)
            try { 
                const uploadResponse = await _axios.post("/upload", formData, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                const imageUrl = uploadResponse.data
                const postData = {
                    content: storedContent, 
                    imageUrl: imageUrl, 
                    userId: user.id, 
                    likes: 0, 
                    latitude: geolocation ? geolocation.latitude : null, 
                    longitude: geolocation ? geolocation.longitude : null
                }
                const response = await _axios.post("/posts", postData)
                for(let val of response.data) {
                    val.username = val.username.username
                }
                setPosts((prevPosts) => [
                    ...prevPosts, 
                    response.data[0]
                ])
                setGeolocationFilteredPosts((prevPosts) => [
                    ...prevPosts, 
                    response.data[0]
                ])
                await new Promise((resolve) => setTimeout(resolve, 500))
            }
            catch (err) {
                if(err.response) {
                    console.error('Something is wrong with the server: ' + err.response.data)
                }
                else if(err.request) {
                    console.error('Something is wrong with the client')
                }
                else {
                    console.error(err)
                }
            }
            finally {
                setActiveStep((prevStep) => prevStep + 1)
                setLoading(false)
                navigate('/', {relative: "route"})
            }
        }
        else {
            alert('Please make sure to submit at least one image and a text')
        }
    }

    return (
        <>
            {loading ? <CustomBackdrop /> : ''}
            <Stepper orientation="vertical" activeStep={activeStep} sx={{width: "80%"}}>
                {stepLabels.map(stepLabel => {
                    return (
                        <Step key={stepLabel.id} sx={{color: theme.palette.global.verticalStepper.labelText.main}}>
                            <StepLabel>
                                <Typography typography="createPost.stepLabel" sx={{color: theme.palette.global.verticalStepper.labelText.main}}>
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