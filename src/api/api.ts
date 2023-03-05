import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0a13c5b1-a427-400f-be11-b50e68ff8029'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    ...settings
})

export const API = {
    getUsers(currentPage:number,pageSize=15) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => (res.data));
    },
    follow(id:string){
        return instance.post(`follow/${id}`,{}).then(res => (res.data))
    },
    unFollow(id:string){
        return instance.delete(`follow/${id}`).then(res => (res.data))
    }
}

export const authAPI = {
    me() {
        return  instance.get('auth/me').then(res => (res.data));
    }
}
