import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://register-login-server.onrender.com/api'
})
//https://register-login-server.onrender.com

//с каждым запросом на сервер из localStorage отправляется токен
instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance