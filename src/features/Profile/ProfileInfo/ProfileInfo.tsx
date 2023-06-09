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
import s from "../ProfileInfo/profileInfo.module.css"
import photo from "../../../assets/imges/photo.jpg"
import {follow, unFollow} from "../../../store/users/users-reducer";

export const ProfileInfo: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)
    const status = useAppSelector(selectProfileStatus)
    const authUserId = useAppSelector(selectAuthUserId)


    const params = useParams<'userId'>();
    let userId = params.userId;
    const isMyProfile = userId === authUserId.toString()

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
        <div className={s.wrapper}>
            <div className={s.right}>
                {
                    isMyProfile && <label>
                        <input type='file' className={s.input} onChange={onAvatarSelected}/>
                        <div className={s.avaWrapper}>
                            <img src={ profile.photos.small? profile.photos.small : photo} alt={"avatar"}/>
                        </div>
                    </label>}
                {     isMyProfile ||  <div className={s.avaWrapper}>
                    <img src={ profile.photos.small? profile.photos.small : photo} alt={"avatar"}/>
                    </div>
                }
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>

            </div>
            <div className={s.left}>
                {
                    editMode
                        ?
                        <ProfileDataReduxForm initialValues={{...profile}} onSubmit={onSubmit}
                        />
                        :
                        <ProfileData profile={profile}
                                     isOwner={isMyProfile}
                                     changeEditMode={changeEditMode}
                        />
                }

            </div>
        </div>
    );
})
export const ProfileDataReduxForm = reduxForm<ProfileDataFormPropsType>({
    form: 'profileDataForm'
})(ProfileDataForm)
