import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {
  addNewPost,
  changeTextNewPost,
  ProfilePageType,
  setProfileTC
} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = ProfilePageType
type MapDispatchToPropsType = {
    setProfile:(ui:number) => void,
    addNewPost:()=>void,
    changeTextNewPost:(text:string)=>void,
}
type PathParamType = {
    userId:string,
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
      this.props.setProfile(this.props.match.params.userId ?Number(this.props.match.params.userId):2)
    }
    render() {
     /* if (!this.props.isAuth) return <Redirect to={"./login"}/>*/
       return (
           <Profile profile = {this.props.profile}  />
       );
   }
}

const mapStateToProps = (state:rootStateType):MapStateToPropsType => (
        {
            profile:state.profilePage.profile,
            posts:state.profilePage.posts,
            text:state.profilePage.text,
           /* isAuth:state.auth.isAuth*/
        }
    )

export default compose<React.ComponentType>(
  connect(mapStateToProps,{
  addNewPost,
  changeTextNewPost,
  setProfile:setProfileTC,
}),WithAuthRedirect,withRouter)(ProfileContainer)