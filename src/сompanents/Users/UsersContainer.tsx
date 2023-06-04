import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    follow,
    getUsers,
    setPage,
    setTotalUsersCount,
    setUsers,
    unFollow,
    UsersType,
    UserType
} from "../../store/users/users-reducer";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../../common/UI/preloader/Preloader";
import {RootStateType} from "../../store/store";


type PropsType = UsersType & {
    getUsers: (page: number) => void,
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page: number) => void,
    setTotalUsersCount: (count: number) => void,
}


export const UsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage)
    }, [props.currentPage]);

    const onPageChanged = (newCurrentPage: number) => {
        props.setCurrentPage(newCurrentPage)
    }

    return <div key={'1'}>
        {props.isFetching ? <Preloader/> : null}
        <UsersComponent users={props.users}
                        isFetching={props.isFetching}
                        pageSize={props.pageSize}
                        totalUserCount={props.totalUserCount}
                        currentPage={props.currentPage}
                        followUser={props.followUser}
                        unFollowUser={props.unFollowUser}
                        setUsers={props.setUsers}
                        setCurrentPage={onPageChanged}
                        setTotalUsersCount={props.setTotalUsersCount}/>
    </div>

}

const mapStateToProps = (state: RootStateType) => {
    console.log(state.usersPage.totalUserCount)
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
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

export default connect(mapStateToProps, {
    setUsers,
    followUser: follow,
    unFollowUser: unFollow,
    getUsers,
    setCurrentPage: setPage,
    setTotalUsersCount,
})(UsersContainer);

