import React from 'react';
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    followTC,
    getUsersTC,
    setCurrentPageTC,
    setTotalUsersCount,
    setUsers,
    unFollowTC,
    UsersType,
    UserType
} from "../../redux/users-reducer";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../common/preloader/Preloader";



type UsersPropsType =  UsersType & {
    getUsers:(page:number) => void,
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page:number) => void,
    setTotalUsersCount: (count:number) => void,
}

class UsersContainer extends React.Component<UsersPropsType>{
    componentDidMount() {
        this.props.getUsers(1)
    }
    onPageChanged = (newCurrentPage:number) =>{
        this.props.setCurrentPage(newCurrentPage)
    }

    render() {
        return<div key={'1'}>
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
            </div>
    }
}

const mapStateToProps = (state:RootStateType) => {
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
    setUsers,
    followUser:followTC,
    unFollowUser:unFollowTC,
    getUsers: getUsersTC,
    setCurrentPage:setCurrentPageTC,
    setTotalUsersCount,
})(UsersContainer);

