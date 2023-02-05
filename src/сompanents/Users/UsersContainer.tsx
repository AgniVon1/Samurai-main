import React from 'react';
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {
    followUserAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unFollowUserAC,
    UsersActionType, UsersType,
    UserType
} from "../../redux/users-reducer";

import axios from "axios";
import {UsersComponent} from "./UsersComponent";


type UsersPropsType =  UsersType & {
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page:number) => void,
    setTotalUsersCount: (count:number) => void,
}

class UsersContainer extends React.Component<UsersPropsType>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }
    onPageChanged = (p:number) =>{
        this.props.setCurrentPage(p)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <UsersComponent users={this.props.users}
                               pageSize={this.props.pageSize}
                               totalUserCount={this.props.totalUserCount}
                               currentPage={this.props.currentPage}
                               followUser={this.props.followUser}
                               unFollowUser={this.props.unFollowUser}
                               setUsers={this.props.setUsers}
                               setCurrentPage={this.onPageChanged}
                               setTotalUsersCount={this.props.setTotalUsersCount}/>
    }
}

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

export default connect(mapStateToProps,mapDispatchToProps)(UsersContainer);

