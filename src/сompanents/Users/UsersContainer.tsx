import React from 'react';
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {followUserAC, setUsersAC, unFollowUserAC, UsersActionType, UserType} from "../../redux/users-reducer";
import {Users} from "./Users";



const mapStateToProps = (state:rootStateType) => {
    return {users: state.usersPage.users,}
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
}
});

export default connect(mapStateToProps,mapDispatchToProps)(Users);