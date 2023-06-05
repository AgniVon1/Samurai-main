import {instance} from "../instance";

export type DialogsResponse = any
export type MessageResponse = any

export const dialogsAPI = {
    getDialogs(userId:number){
        return instance.get<DialogsResponse>(`dialogs/${userId}`)
    },
    getMessages(userIdFriend:number) {
        return instance.get<MessageResponse>(`dialogs/${userIdFriend}/messages`)
    },
    sendMessage(userIdFriend:number) {
        return instance.post<MessageResponse>(`dialogs/${userIdFriend}/messages`)
    },
}