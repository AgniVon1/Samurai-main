import {RootStateType} from "../store";

export const selectUsers = (state: RootStateType) => state.usersPage.users
export const selectTotalCount = (state: RootStateType) => state.usersPage.totalUserCount
export const selectCurrentPage = (state: RootStateType) => state.usersPage.currentPage
export const selectPageSize = (state: RootStateType) => state.usersPage.pageSize
export const selectIsFetching = (state: RootStateType) => state.usersPage.isFetching
export const selectFilterTemp = (state: RootStateType) => state.usersPage.filter.term
export const selectFilterFriend = (state: RootStateType) => state.usersPage.filter.friend
export const selectFilter = (state: RootStateType) => state.usersPage.filter
