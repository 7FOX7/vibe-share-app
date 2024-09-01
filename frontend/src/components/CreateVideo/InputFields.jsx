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