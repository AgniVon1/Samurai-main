import {ProfileType} from "../../../../store/profile/profile-reducer";
import {Contacts} from "./Contants/Contants";
import s from "./profileData.module.css"

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    changeEditMode: () => void

}

export const ProfileData: React.FC<PropsType> =
    ({profile, isOwner, changeEditMode}) => {
        return (
            <>
                {
                    isOwner &&
                    <div>
                        <button onClick={changeEditMode} style={{width: '165px'}}>
                            Редактировать
                        </button>
                    </div>
                }

                <div className={s.fullName}>
                     {profile.fullName}
                </div>
                <div className={s.item}>
                    <b>Работа:</b> {profile.lookingForAJobDescription}
                </div>
                <div className={s.item}>
                    <b>Обо мне:</b> {profile.aboutMe}
                </div>

                <Contacts contacts={profile.contacts} />
            </>
        );
    }