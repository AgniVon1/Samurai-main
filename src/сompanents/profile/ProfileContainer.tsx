import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";

import {
  addNewPost,
  getUserStatus,
  ProfilePageType,
  setProfileTC, updateUserStatus
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {RootStateType} from "../../redux/redux-store";



type MapStateToPropsType = ProfilePageType &{
  authorizedUserId:number|null,
  isAuth:boolean
}

type MapDispatchToPropsType = {
    setProfile:(ui:number) => void,
    addNewPost:()=>void,

    getUserStatus:(uId:number) => void,

    updateUserStatus:(newStatus :string) =>void,
}
type PathParamType = {
    userId:string,
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
      let uId = this.props.match.params.userId ? Number(this.props.match.params.userId) : this.props.authorizedUserId
      console.log(uId)
      if (!uId) uId = Number(this.props.authorizedUserId)
      this.props.setProfile(uId)
      this.props.getUserStatus(uId);
    }

    render() {
       return (
           <Profile profile = {this.props.profile}  status = {this.props.status} updateUserStatus = {this.props.updateUserStatus} />
       );
   }
}

const mapStateToProps = (state:RootStateType):MapStateToPropsType => (
        {
            status:state.profilePage.status,
            profile:state.profilePage.profile,
            posts:state.profilePage.posts,
            authorizedUserId:state.auth.id,
            isAuth:state.auth.isAuth
        }
    )

export default compose<React.ComponentType>(
  connect(mapStateToProps,{
  addNewPost,
  setProfile:setProfileTC,
    getUserStatus,
    updateUserStatus,
})
  ,withRouter)(ProfileContainer)