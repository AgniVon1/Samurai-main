import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoPropsType = {
  status:string,
  profile:ProfileType| null,
  updateUserStatus:(newStatus:string) => void,
}

export const ProfileInfo:React.FC<ProfileInfoPropsType> = ({updateUserStatus,status,profile}) => {
  if (!profile) return <Preloader/>
  return (
    <div>
      {profile.photos.large && <img src={profile.photos.large}/> }
      {profile.aboutMe && <div>{profile.aboutMe}</div>}
      {profile.userId && <div>{profile.userId}</div>}
      {profile.fullName && <div>{profile.fullName} </div>}
      <ProfileStatus status={status} updateUserStatus = {updateUserStatus}/>
    </div>
  );
};

