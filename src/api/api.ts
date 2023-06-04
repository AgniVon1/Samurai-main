import axios from "axios";
import {FormDataType} from "../redux/profile-reducer";

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
    },
    getProfile(userId:number){
        return profileAPI.getProfile(userId)
    }
}

export const securityAPI = {
    getCaptcha() {
        return (
            instance.get(`security/get-captcha-url`)
        )
    }
}

export const profileAPI = {
    getProfile(userId:number){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`,{status:status})
    },
    updateUserPhoto(photoFile: File) {
        const formData = new FormData;
        formData.append('image', photoFile);
        return (
            instance.put<PutResponseType<UserPhotoResType>>(`profile/photo`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

        )
    },
    updateUserProfile(profile: FormDataType) {
        return (
            instance
                .put<PutResponseType>(`profile`, profile)
                .then(response => response.data)
        )
    }
}
export const authAPI = {
    me() {
        return  instance.get('auth/me').then(res => (res.data));
    },
    login(email:string,password:string,rememberMe:boolean = false) {
        return instance.post(`auth/login`,{email,password,rememberMe})
    },
    logaut() {
        return instance.delete(`auth/login`)
    }
}
export type PutResponseType<D = { }> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type UserPhotoResType = {
    photos: {
        small: string
        large: string
    }
}