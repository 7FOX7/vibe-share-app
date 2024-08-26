import { useState }from "react";
import { useMemo } from "react";
import CustomInput from "../../customs/CustomInput"
import CustomTextArea from "../../customs/CustomTextArea"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CancelIcon from '@mui/icons-material/Cancel';
import { postMaxLength } from "../../data/inputMaxLength";

const InputFields = ({urlInputRef}) => {
    const [inputValue, setInputValue] = useState("")

    function handleInput() {
        setInputValue(urlInputRef.current.value) 
    }

    function clearInputField(e) {
        urlInputRef.current.value = ""
        setInputValue(e.currentTarget.value) 
    }

    const textArea = useMemo(() => {
        return (
            <CustomTextArea 
                placeholder="Write your thoughts here..." 
                width="85%" 
                border="3px solid #ffcf33" 
                background="transparent" 
                color="#fff" 
                minRows={8}
                maxLength={postMaxLength} 
            />
        )
    }, [])

    return (
        <>
            <CustomInput 
                placeholder="Paste the link here..." 
                width="85%"
                borderRadius="5px" 
                border="3px solid #ffcf33" 
                fontSize="1rem" 
                padding="4px 6px" 
                color="#fff" 
                icon={
                    urlInputRef.current.value === "" || !urlInputRef.current ? 
                    <ContentCopyIcon sx={{
                        color: "goldColors.goldLight.main",
                    }} />
                    : 
                    <CancelIcon onClick={clearInputField} sx={{
                        cursor: "pointer"
                    }} />
                }
                onChange={handleInput}
                ref={urlInputRef}
            />
            {textArea}
        </>
    )
}

export default InputFields

/*
    the goal when clicking on 'post' button, we need to check if the url of video is valid, and, 
    if it is, then publish a video (we should create some kind of filter, and only one video might be seen)

    in step by step, this might be described like: 
    
    Lets assume, I have an input field where the user can paste the url to the video, and a 'post' button. when 
    clicking on 'post' button, the following should happen:  
    1. we check the url (or any other efficient way) to be able to identify if the link provided is a link to the actual video
    2. if the link video is valid, I guess we need to store it somewhere with some of the user credentials (id, username)
    3. video source might then be extracted, and I can add it to the 'videos' section

    how I can implement this?

    3. for the sake of performance, some restrictions might be applied, like: in the section 'watch videos' there will
    be only one video (so, it is not like user is uploading the video, and it might be immediately visible, but lets say to put his video 'on hold' and show the video that was uploaded first, and, once one day passes, another video, in line is shown, then next, then next) 
*/