import axios from "axios"

const $api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
})

$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api