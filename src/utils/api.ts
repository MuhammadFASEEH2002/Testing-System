import axios from 'axios'

const api = axios.create({
   //@ts-ignore
  baseURL : `${process.env.AXIOS_LINK}`,
  timeout : 30000,
  withCredentials : true
})

export default api