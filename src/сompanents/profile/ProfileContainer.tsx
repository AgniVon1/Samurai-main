import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {addNewPost, changeTextNewPost, ProfilePageType, ProfileType, setProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";


type MapStateToPropsType = ProfilePageType
type MapDispatchToPropsType = {
    setProfile:(profile:ProfileType) => void,
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
        let usID = this.props.match.params.userId
        if (usID!) usID = "2"
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${usID}`)
            .then(response => {
               this.props.setProfile(response.data)
            })
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
    setProfile
})(Companent)
