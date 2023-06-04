import {API} from "../api/api";
import {Dispatch} from "redux";


export type UsersType = {
    users: Array<UserType>,
    pageSize:number,
    totalUserCount:number,
    currentPage:number,
    isFetching:boolean
}

export type UserType = {
    name: string,
    id: string,
    photos: {
    small: string,
        large: string
},
    status: string,
    followed: boolean,

}

const initialUsersState: UsersType =
    {
        users: [

        ],
        pageSize:5,
        totalUserCount:40,
        currentPage:1,
        isFetching : false,
    }

const FOLLOW = "USERS/FOLLOW"
const UNFOLLOW = "USERS/UNFOLLOW"
const SET_USERS = "USERS/SET_USER"
const SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "USERS/SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "USERS/TOGGLE_IS_FETCHING"

export type UserActionType = ReturnType<typeof unFollowUser>
    | ReturnType<typeof followUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof togglelIsFetching>

export type ActionAssure = ReturnType<typeof togglelIsFetching>


export const unFollowUser = (userID: string) => {
    return {type: UNFOLLOW, userID} as const
}
export const followUser = (userID: string) => {
    return {type: FOLLOW, userID} as const
}
export const setUsers = (users:Array<UserType>) => {
    return {type: SET_USERS, users} as const
}
export const setCurrentPage = (page:number) => {
    return {type: SET_CURRENT_PAGE, page} as const
}
export const setTotalUsersCount = (usersCount:number) => {
    return {type: SET_TOTAL_USERS_COUNT, usersCount} as const
}
export const togglelIsFetching = (value:boolean) => {
    return {type: TOGGLE_IS_FETCHING, value} as const
}

const usersReducer = (state: UsersType = initialUsersState, action: UserActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    (u) => (action.userID === u.id) ?
                        {...u, followed: true} :
                        u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(
                    (u) => (action.userID === u.id) ?
                        {...u, followed: false} :
                        u)
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUserCount: action.usersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state
    }
}
export const getUsersTC = (currentPage:number) => {
  return async (dispatch : Dispatch<UserActionType>) => {
      dispatch(togglelIsFetching(true))
      const data = await  API.getUsers(currentPage)
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
      dispatch(togglelIsFetching(false))
  }
}
export  const unFollowTC = (userId:string) => {
    return async (dispatch:Dispatch<UserActionType>) =>{
        dispatch(togglelIsFetching(true))
        await API.unFollow(userId).then(data => {
            data.resultCode === 0 &&  dispatch(unFollowUser(userId))
            dispatch(togglelIsFetching(false))
        })
    }
}
export  const followTC = (userId:string) => {
    return async (dispatch:Dispatch<UserActionType>) =>{
        dispatch(togglelIsFetching(true))
        await API.follow(userId).then(data => {
            data.resultCode === 0 &&  dispatch(followUser(userId))
            dispatch(togglelIsFetching(false))
        })
    }
}


export const setCurrentPageTC = (currentPage:number) => {
    return async (dispatch : Dispatch<UserActionType>,) => {
        dispatch(togglelIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        await API.getUsers(currentPage).then(data => {
            dispatch(setUsers(data.items))
            dispatch(togglelIsFetching(false))
        })
    }
}


export default usersReducer