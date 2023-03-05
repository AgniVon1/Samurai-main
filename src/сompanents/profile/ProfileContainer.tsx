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
import {RouteComponentProps, withRouter} from "react-router-dom";



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
        let usID = Number(this.props.match.params.userId)//параметра нет?
        if (usID!) usID = 2
      usID = 2

      this.props.setProfile(2)
    }
    render() {
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
        }
    )
const Companent = withRouter(ProfileContainer)
export default connect(mapStateToProps,{
    addNewPost,
    changeTextNewPost,
    setProfile:setProfileTC,
})(Companent)
