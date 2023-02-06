import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {rootStateType} from "../../redux/redux-store";
import {addNewPost, changeTextNewPost, ProfilePageType, ProfileType, setProfile} from "../../redux/profile-reducer";


export type ProfileContainerPropsType = ProfilePageType & {
    setProfile:(profile:ProfileType) => void,
    addNewPost:()=>void,
    changeTextNewPost:(text:string)=>void,
}

export class ProfileContainer extends React.Component<ProfileContainerPropsType>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

const mapStateToProps = (state:rootStateType) => (
        {
            profile:state.profilePage.profile,
            posts:state.profilePage.posts,
            text:state.profilePage.text,
        }
    )

export default connect(mapStateToProps,{
    addNewPost,
    changeTextNewPost,
    setProfile
})(ProfileContainer)
