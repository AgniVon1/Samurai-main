import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";


type ProfileInfoPropsType = {
    profile:ProfileType| null,
}

const ProfileInfo:React.FC<ProfileInfoPropsType> = ({profile}) => {
    if (!profile) return <Preloader/>
    return (
        <div>
            {profile.photos.large && <img src={profile.photos.large}/> }
            {profile.aboutMe && <div>profile.aboutMe</div>}
        </div>
    );
};

export default ProfileInfo;