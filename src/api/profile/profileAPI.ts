import {instance} from "../instance";
import {APIResponseType} from "../types/types";
import {FormDataType, ProfileType} from "../../store/profile/profile-reducer";

export const profileAPI = {
    getProfile(userId:number){
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId:number){
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put<APIResponseType>(`profile/status`,{status:status})
    },
    updateUserPhoto(photoFile: File) {
        const formData = new FormData;
        formData.append('image', photoFile);
        return (
            instance.put<APIResponseType<UserPhotoResType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        )
    },
    updateUserProfile(profile: FormDataType) {
        return (
            instance
                .put<APIResponseType>(`profile`, profile)
                .then(response => response.data)
        )
    }
}

type UserPhotoResType = {
    photos: {
        small: string
        large: string
    }
}