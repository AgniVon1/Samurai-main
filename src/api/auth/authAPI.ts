import {instance} from "../instance";
import {APIResponseType} from "../types/types";

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then(res => (res.data));
    },
    login(email:string,password:string,rememberMe:boolean = false,captchaUrl:string|null) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`,{email,password,rememberMe,captchaUrl})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}