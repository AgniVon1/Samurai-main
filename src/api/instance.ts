import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0a13c5b1-a427-400f-be11-b50e68ff8029'
    }
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    ...settings
})

