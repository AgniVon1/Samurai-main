/*
import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";

import {addNewPost, getUserStatus, ProfilePageType, setProfileTC, updateUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {RootStateType} from "../../redux/redux-store";


type MapStateToPropsType = ProfilePageType & {
    authorizedUserId: number | null,
    isAuth: boolean
}

type MapDispatchToPropsType = {
    setProfile: (ui: number) => void,
    addNewPost: () => void,
    getUserStatus: (uId: number) => void,
    updateUserStatus: (newStatus: string) => void,
}
type PathParamType = {
    userId: string,
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamType> & OwnPropsType


export const ProfileContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        let uId = props.match.params.userId ? Number(props.match.params.userId) : props.authorizedUserId
        console.log(uId)
        if (!uId) uId = Number(props.authorizedUserId)
        props.setProfile(uId)
        props.getUserStatus(uId);
    }, []);

    /!*return (
        <Profile profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
    );*!/
    return <></>
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => (
    {
        status: state.profilePage.status,
        profile: state.profilePage.profile,
        posts: state.profilePage.posts,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
)
/!*

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addNewPost,
        setProfile: setProfileTC,
        getUserStatus,
        updateUserStatus,
    })
    , withRouter)(ProfileContainer)*!/
*/

export default () => {
}