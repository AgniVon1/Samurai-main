import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoPropsType = {
  profile:ProfileType| null,
}

export const ProfileInfo:React.FC<ProfileInfoPropsType> = ({profile}) => {
  if (!profile) return <Preloader/>
  return (
    <div>
      {profile.photos.large && <img src={profile.photos.large}/> }
      {profile.aboutMe && <div>{profile.aboutMe}</div>}
      {profile.userId && <div>{profile.userId}</div>}
      {profile.fullName && <div>{profile.fullName} </div>}
      <ProfileStatus status={"test"}/>
    </div>
  );
};

