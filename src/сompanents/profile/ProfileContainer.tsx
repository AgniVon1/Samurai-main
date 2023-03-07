import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {
  addNewPost,
  changeTextNewPost, getUserStatus,
  ProfilePageType,
  setProfileTC, updateUserStatus
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = ProfilePageType

type MapDispatchToPropsType = {
    setProfile:(ui:number) => void,
    addNewPost:()=>void,
    changeTextNewPost:(text:string)=>void,

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
      const uId = this.props.match.params.userId ?Number(this.props.match.params.userId):27772
      console.log(uId)
      this.props.setProfile(uId)
      this.props.getUserStatus(uId);
    }
    render() {
       return (
           <Profile profile = {this.props.profile}  status = {this.props.status} updateUserStatus = {this.props.updateUserStatus} />
       );
   }
}

const mapStateToProps = (state:rootStateType):MapStateToPropsType => (
        {
            status:state.profilePage.status,
            profile:state.profilePage.profile,
            posts:state.profilePage.posts,
            text:state.profilePage.text,
        }
    )

export default compose<React.ComponentType>(
  connect(mapStateToProps,{
  addNewPost,
  changeTextNewPost,
  setProfile:setProfileTC,
    getUserStatus,
    updateUserStatus,
})
  ,WithAuthRedirect
  ,withRouter)(ProfileContainer)