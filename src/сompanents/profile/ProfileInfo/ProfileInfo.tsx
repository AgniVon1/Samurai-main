import React, {useEffect, useState} from 'react';


import {ProfileStatus} from "./ProfileStatus";
import {ProfileDataForm, ProfileDataFormPropsType} from "./ProfileData/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData";
import {selectAuthUserId} from "../../../store/auth/auth-selectors";
import {selectProfile, selectProfileStatus} from "../../../store/profile/profile-selectors";
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {useParams} from "react-router-dom";
import {
  fetchProfile,
  fetchStatus,
  updateUserPhoto,
  updateUserProfile,
  updateUserStatus
} from "../../../store/profile/profile-reducer";
import {reduxForm} from "redux-form";
import {Preloader} from "../../../common/UI/Preloader/Preloader";


export const ProfileInfo:React.FC = React.memo( () => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const authUserId = useAppSelector(selectAuthUserId)

  const params = useParams<'userId'>();
  let userId = params.userId;

  useEffect(() => {
    if (!userId) {
      userId = authUserId?.toString();
    }
    if (userId) {
      dispatch(fetchProfile(Number(userId)));
      dispatch(fetchStatus(Number(userId)));
    }
  }, [userId])

  const [editMode, setEditMode] = useState<boolean>(false);

  const changeEditMode = () => {
    setEditMode(!editMode);
  }


  const onSubmit = (formData: ProfileDataFormPropsType) => {
    dispatch(updateUserProfile(formData)).then(() => {
      changeEditMode()
    });
  }

  const onAvatarSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      dispatch(updateUserPhoto(event.target.files[0]));
    }
  }


  if (!profile) return <Preloader/>
  return (
    <div>
      {profile.photos.large && <img src={profile.photos.small || 'PHOTO'} alt={'PHOTO'}/> }
      {
        !userId
            ?
            <>
              <input type='file' onChange={onAvatarSelected}/>
              <span>Выберите файл</span>
            </>
            : ''
      }

      {
        editMode
            ?
            <ProfileDataReduxForm initialValues={{...profile}} onSubmit={onSubmit}
            />
            :
            <ProfileData profile={profile}
                         isOwner={!userId}
                         changeEditMode={changeEditMode}
            />
      }
      <ProfileStatus status={status} updateUserStatus = {updateUserStatus}/>
    </div>
  );
})
export const ProfileDataReduxForm = reduxForm<ProfileDataFormPropsType>({
  form: 'profileDataForm'
})(ProfileDataForm)
