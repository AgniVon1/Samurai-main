import React from 'react';
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import loader from "../../assets/imges/loader.gif"
import {
    followUser,
    setCurrentPage, setTotalUsersCount,
    setUsers, togglelIsFetching,
    unFollowUser,
    UsersActionType, UsersType,
    UserType
} from "../../redux/users-reducer";

import axios from "axios";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../common/preloader/Preloader";
import {API} from "../../api/api";


type UsersPropsType =  UsersType & {
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page:number) => void,
    setTotalUsersCount: (count:number) => void,
    togglelIsFetching: (value:boolean) => void,

}

class UsersContainer extends React.Component<UsersPropsType>{
    componentDidMount() {
        API.getUsers().then(data =>{
            this.props.togglelIsFetching(false)
            this.props.setUsers(data.items)
        } )
    }
    onPageChanged = (p:number) =>{
        this.props.togglelIsFetching(true)
        this.props.setCurrentPage(p)
        API.getUsers().then(data =>{
            this.props.togglelIsFetching(false)
            this.props.setUsers(data.items)
        } )
    }

    render() {
        return<>
            {this.props.isFetching ? <Preloader/>: null}

            <UsersComponent users={this.props.users}
                               isFetching={this.props.isFetching}
                               pageSize={this.props.pageSize}
                               totalUserCount={this.props.totalUserCount}
                               currentPage={this.props.currentPage}
                               followUser={this.props.followUser}
                               unFollowUser={this.props.unFollowUser}
                               setUsers={this.props.setUsers}
                               setCurrentPage={this.onPageChanged}
                               setTotalUsersCount={this.props.setTotalUsersCount}/>
            </>
    }
}

const mapStateToProps = (state:rootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUserCount:state.usersPage.totalUserCount,
        currentPage:state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

/*const mapDispatchToProps = (dispatch: (a: UsersActionType) => void) => ({
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
        dispatch(setTotalUsersCountAC(usersCount))
    },
    togglelIsFetching:(value:boolean)=>{
        dispatch(togglelIsFetchingAC(value))
    },
});*/

export default connect(mapStateToProps,{
    followUser,
    unFollowUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    togglelIsFetching,
})(UsersContainer);

