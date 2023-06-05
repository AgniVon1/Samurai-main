import {instance} from "../instance";
import {GetItemsType} from "../types/types";

export type DialogResponse = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: {
        small: string | null,
        large: string | null
    }
}
export type MessageResponse = {
    id: string,
    body: string,
    translatedBody: any,
    addedAt: string,
    senderId: number,
    enderName: string,
    recipientId: number,
    viewed: boolean
}
export const dialogsAPI = {
    getAllDialogs() {
        return instance.get<DialogResponse[]>(`dialogs`)
    },
    startChatting(userIdFriend: number) {
        return instance.put<MessageResponse>(`dialogs/${userIdFriend}`)
    },
    getCountNewMess(){
      return instance.get("dialogs/messages/new/count")
    },
    getAllMessagesFromFriend(userIdFriend: number, page: number = 1, count: number = 10) {
        return instance.get<GetItemsType<MessageResponse>>(`dialogs/${userIdFriend}/messages`)
    },
    sendMessage(userIdFriend: number, body: string) {
        return instance.post<MessageResponse>(`dialogs/${userIdFriend}/messages`, {body})
    },
}