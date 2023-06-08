import {instance} from "../instance";
import {APIResponseType, GetItemsType} from "../types/types";
import {UserType} from "../../store/users/users-reducer";

export const usersAPI = {
    getUsers(params?: Partial<QueryParams>) {
        return instance.get<GetItemsType<UserType>>(`users?page=${params?.currentPage}&count=${params?.pageSize}&term=${params?.term}` +
            (params?.friend === null ? '' : `&friend=${params?.friend}`) ).then(res => res.data);
    },
    follow(id:string){
        return instance.post<APIResponseType>(`follow/${id}`,{}).then(res => (res.data))
    },
    unFollow(id:string){
        return instance.delete(`follow/${id}`).then(res => (res.data)) as Promise<APIResponseType>
    },
}
export type QueryParams = {
    currentPage: number
    pageSize: number
    term: string
    friend: boolean | null
}