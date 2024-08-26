import { useEffect } from "react";
import { useComments } from "../../contexts/CommentsContext";
import CustomCommentsSection from "../../customs/CustomCommentsSection";
import { useParams } from "react-router-dom";
import InputField from "./InputField";

const CommentSection = () => {
    const {fetchComments} = useComments(); 
    const {id, type} = useParams(); 

    useEffect(() => {
        fetchComments(id, type)
    }, [])
    return (
        <>
            <CustomCommentsSection />
            <InputField id={id} type={type} />
        </>
    )
}

export default CommentSection