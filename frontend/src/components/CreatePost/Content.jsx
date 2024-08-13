import CustomTextArea from "../../customs/CustomTextArea"
import CustomImageUploader from "../../customs/CustomImageUploader"
import PostPreview from "./PostPreview"

const Content = ({activeStep}) => {
    if(activeStep === 0) {
        return <CustomTextArea />
    } 
    else if(activeStep === 1) {
        return <CustomImageUploader />
    }
    else {
        return <PostPreview />
    }
}

export default Content