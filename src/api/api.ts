import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a975d2eb-6b11-4e02-9b1f-9d435ea8aed2'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const API = {
    getUsers(currentPage = 1,pageSize = 10) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(res => (res.data));
    },
    follow(id:string){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,{}).then(res => (res.data))
    },
    unFollow(id:string){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`).then(res => (res.data))
    }
}

export const authAPI = {
    me() {
        return  instance.get('auth/me').then(res => (res.data));
    }
}
