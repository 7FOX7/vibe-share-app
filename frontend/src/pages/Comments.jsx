import { useParams } from "react-router-dom"

const Comments = () => {
    const {type, id, author} = useParams(); 

    return (
        <>
            <p>Post type is: <strong>{type}</strong></p>
            <p>Post id is: <strong>{id}</strong></p>
            <p>Post author is: <strong>{author}</strong></p>
        </>
    )
}

export default Comments