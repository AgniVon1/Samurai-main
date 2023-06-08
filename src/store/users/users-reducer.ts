import {Dispatch} from "redux";
import {usersAPI} from "../../api/users/usersAPI";
import {ResultCodesEnum} from "../../api/types/types";

const initialUsersState: UsersType =
    {
        users: [],
        pageSize: 10,
        totalUserCount: 100,
        currentPage: 1,
        isFetching: false,
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }

const FOLLOW = "USERS/FOLLOW"
const UNFOLLOW = "USERS/UNFOLLOW"
const SET_USERS = "USERS/SET_USER"
const SET_FILTER = "USERS/SET_FILTER"
const SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "USERS/SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "USERS/TOGGLE_IS_FETCHING"

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
        case SET_FILTER:
            return {...state, filter: {...state.filter, friend: action.payload.friend, term: action.payload.term}};
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

export const getUsers = (currentPage: number, pageSize: number,
                         filterPayload: UsersSearchFilterType) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        dispatch(togglelIsFetching(true));
        try {
            const data = await usersAPI.getUsers({
                currentPage,
                pageSize,
                term: filterPayload.term,
                friend: filterPayload.friend
            })
            dispatch(setUsers(data.items));
            dispatch(setFilter(filterPayload));
            dispatch(setCurrentPage(currentPage));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(togglelIsFetching(false));
        } catch (error: any) {
            console.log(error);
        }
    }
}

export const unFollow = (userId: string) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        dispatch(togglelIsFetching(true))
        const data = await usersAPI.unFollow(userId)
        if (data.resultCode === ResultCodesEnum.Success) dispatch(unFollowUser(userId))
        dispatch(togglelIsFetching(false))

    }
}
export const follow = (userId: string) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        dispatch(togglelIsFetching(true))
        const data = await usersAPI.follow(userId)
        if (data.resultCode === ResultCodesEnum.Success) dispatch(followUser(userId))
        dispatch(togglelIsFetching(false))
    }
}

export type UserActionType = ReturnType<typeof unFollowUser>
    | ReturnType<typeof followUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setFilter>
    | TogglelIsFetching

export type TogglelIsFetching = ReturnType<typeof togglelIsFetching>
export const togglelIsFetching = (value: boolean) => {
    return {type: TOGGLE_IS_FETCHING, value} as const
}

export const unFollowUser = (userID: string) => {
    return {type: UNFOLLOW, userID} as const
}
export const setFilter = (payload: UsersSearchFilterType) => ({type: SET_FILTER, payload} as const)
export const followUser = (userID: string) => {
    return {type: FOLLOW, userID} as const
}
export const setUsers = (users: Array<UserType>) => {
    return {type: SET_USERS, users} as const
}
export const setCurrentPage = (page: number) => {
    return {type: SET_CURRENT_PAGE, page} as const
}
export const setTotalUsersCount = (usersCount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, usersCount} as const
}


export type UsersType = {
    users: Array<UserType>,
    pageSize: number,
    totalUserCount: number,
    currentPage: number,
    isFetching: boolean
    filter: {
        term: string,
        friend: null | boolean
    }
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

export type UsersSearchFilterType = {
    term: string
    friend: null | boolean
}


export default usersReducer