import React from 'react';
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {
    followUserAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unFollowUserAC,
    UsersActionType,
    UserType
} from "../../redux/users-reducer";
import {UsersClassComponent} from "./UsersClassComponent";



const mapStateToProps = (state:rootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUserCount:state.usersPage.totalUserCount,
        currentPage:state.usersPage.currentPage,
    }
}

const mapDispatchToProps = (dispatch: (a: UsersActionType) => void) => ({
    followUser: (userID:string) => {
        dispatch(followUserAC(userID))
    },
    unFollowUser: (userID:string) => {
        dispatch(unFollowUserAC(userID))
    },
    setUsers: (users:Array<UserType>)=>{
    dispatch(setUsersAC(users))
    },
    setCurrentPage: (page:number)=>{
        dispatch(setCurrentPageAC(page))
    },
    setTotalUsersCount: (usersCount:number)=>{
        dispatch(setTotalUsersCountAC(usersCount))}
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersClassComponent);