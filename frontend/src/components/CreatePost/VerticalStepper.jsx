import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { usePosts } from "../../contexts/PostsContext"
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
import arrayBufferToFile from "../../functionalities/arrayBufferToFile"
import base64ToArrayBuffer from "../../functionalities/base64ToArrayBuffer"

const VerticalStepper = () => {
    const [loading, setLoading] = useState(false); 
    const [activeStep, setActiveStep] = useState(0);
    const {user} = useAuth(); 
    const {setPosts} = usePosts(); 
    const navigate = useNavigate(); 

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
            const currentDate = new Date().toISOString().split('T')[0]
            const formData = new FormData();
            formData.append('image', file)
            try { 
                const uploadResponse = await axios.post("http://localhost:8080/upload", formData, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                const imageUrl = uploadResponse.data
                const postData = {
                    publishDate: currentDate, 
                    content: storedContent, 
                    imageUrl: imageUrl, 
                    userId: user.id, 
                    likes: 0
                }
                const response = await axios.post("http://localhost:8080/posts", postData)
                console.log(response.statusText)
                setPosts((prevPosts) => [
                    ...prevPosts, 
                    {id: response.data[0].id, username: user.username, ...postData}
                ])
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