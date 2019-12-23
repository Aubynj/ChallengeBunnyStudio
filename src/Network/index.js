/**
 * This file contains Axios config 
 * */
import axios from 'axios'


const api = {
    dev: `http://localhost:8000`,
    remote: "",
}
  
const HTTP = axios.create({
    baseURL: api.remote,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
})
  
HTTP.interceptors.request.use(config => {
    return config
})

HTTP.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})
  

  
  export default HTTP;