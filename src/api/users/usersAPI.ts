import {instance} from "../instance";
import {APIResponseType, GetItemsType} from "../types/types";
import {UserType} from "../../store/users/users-reducer";

export const usersAPI = {
    getUsers(currentPage:number = 1, pageSize:number = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`) ).then(res => res.data);
    },
    follow(id:string){
        return instance.post<APIResponseType>(`follow/${id}`,{}).then(res => (res.data))
    },
    unFollow(id:string){
        return instance.delete(`follow/${id}`).then(res => (res.data)) as Promise<APIResponseType>
    },
}