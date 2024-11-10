import axios from "axios";

const BASE_URL = "https://vibe-share-app-project.onrender.com"

const _axios = axios.create({
   baseURL: BASE_URL,  
   timeout: 2500, 
})

export default _axios