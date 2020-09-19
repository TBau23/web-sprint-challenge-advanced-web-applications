import { axiosWithAuth } from '../utils/axiosWithAuth'

export const fetchColors = () => {
    return axiosWithAuth()
        .get("/api/colors")
        .then(res => {
            console.log('fetch colors', res)
        })
        .catch(error => {console.log(error)})
        
}